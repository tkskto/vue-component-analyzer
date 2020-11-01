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
    // get filename without current working directory.
    const shortFilename = filename.replace(cwd, '');
    // get file statistic
    const stat = statSync(filename);

    console.log(`read ${filename}.`);

    // increment count of this file.
    this._counter.add(shortFilename);

    // if this file is not Vue Component file, return only filename and stat.
    if (extname(filename) === '' || extname(filename) !== '.vue') {
      return {
        name: shortFilename,
        props: '',
        size: stat.size,
        lastModifiedTime: isTest ? 0 : Number(stat.mtimeMs.toFixed(0)),
        children: [],
      };
    }

    const contents = readFileSync(filename, 'utf-8');
    const component = new VueComponent(shortFilename, contents, stat);

    try {
      // if we get, read imported file recursive.
      for (let i = 0, len = component.importDeclaration.length; i < len; i++) {
        // TODO: support other types? (value might be RegExp, or number, boolean.)
        const source = String(component.importDeclaration[i].source.value);

        if (source) {
          const nextFilename = resolveFile(source, filename);

          if (nextFilename) {
            component.addChildReport(this.getImportDeclarationTree(nextFilename, isTest));
          }
        }
      }
    } catch (err) {
      console.error(`Something went wrong with reading ${filename}`);
      console.error(err.message);
    }

    return component.getFileReport(isTest);
  };

  get counter(): FileCounter {
    return this._counter;
  }
}
