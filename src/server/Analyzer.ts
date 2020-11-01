import FileReport = vueComponentAnalyzer.FileReport;
import {resolveFile} from './utils';
import {readFileSync, statSync} from 'fs';
import {resolve, extname} from 'path';
import {FileCounter} from './FileCounter';
import {VueComponent} from './VueComponent';
const cwd = process.cwd();

export class Analyzer {
  private readonly _counter: FileCounter;

  constructor() {
    this._counter = new FileCounter();
  }

  /**
   * get import tree.
   * @param fileName entry file name
   * @param isTest whether it through the test. if this doesn't exist lastModifiedTime will always fail on the GitHub Actions.
   */
  public getImportDeclarationTree = (fileName: string, isTest = false): FileReport => {
    const filename = resolve(cwd, fileName);
    const shortFilename = filename.replace(cwd, '');
    const children: FileReport[] = [];

    // get file statistic
    const stat = statSync(filename);
    const result: FileReport = {
      name: shortFilename,
      props: '',
      size: stat.size,
      lastModifiedTime: isTest ? 0 : Number(stat.mtimeMs.toFixed(0)),
      children,
    };

    console.log(`read ${filename}.`);

    // increment count of this file.
    this._counter.add(shortFilename);

    if (extname(filename) === '') {
      return result;
    }

    // if this file is not Vue Component file, we return only filename and stat.
    if (extname(filename) !== '.vue') {
      return result;
    }

    try {
      const file = readFileSync(filename, 'utf-8');
      const component = new VueComponent(file);

      result.props = component.props;

      // if we get, read imported file recursive.
      for (let i = 0, len = component.importDeclaration.length; i < len; i++) {
        // TODO: support other types? (value might be RegExp, or number, boolean.)
        const source = String(component.importDeclaration[i].source.value);

        if (source) {
          const nextFilename = resolveFile(source, filename);

          if (nextFilename) {
            children.push(this.getImportDeclarationTree(nextFilename, isTest));
          }
        }
      }
    } catch (err) {
      console.error(`Something went wrong with reading ${filename}`);
      console.error(err.message);
    }

    return result;
  };

  get counter(): FileCounter {
    return this._counter;
  }
}
