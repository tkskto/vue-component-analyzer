import FileReport = vueComponentAnalyzer.FileReport;
import {ESLintProgram} from 'vue-eslint-parser/ast/nodes';
import {parse} from 'vue-eslint-parser';
import {getImportDeclaration, getPropsDeclaration, resolveFile} from './utils';
import {Token} from 'vue-eslint-parser/ast/tokens';
import {readFileSync, statSync} from 'fs';
import {resolve, extname} from 'path';
import {FileCounter} from './FileCounter';
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
    const result: FileReport = {
      name: shortFilename,
      props: '',
      size: 0,
      lastModifiedTime: 0,
      children,
    };

    console.log(`read ${filename}.`);

    // increment count of this file.
    this._counter.add(shortFilename);

    if (extname(filename) === '') {
      return result;
    }

    // get statistic only vue file.
    const stat = statSync(filename);

    if (!isTest) {
      result.lastModifiedTime = Number(stat.mtimeMs.toFixed(0));
    }

    result.size = stat.size;

    // if this file is not Vue Component file, we return only filename and stat.
    if (extname(filename) !== '.vue') {
      return result;
    }

    try {
      const file = readFileSync(filename, 'utf-8');
      const parserOption = {
        ecmaVersion: 2018,
        sourceType: 'module',
      };

      // using vue-eslint-parser package.
      const esLintProgram: ESLintProgram = parse(file, parserOption);

      // get props from parser results.
      if (esLintProgram.tokens) {
        result.props = this.getProps(esLintProgram.tokens);
      }

      // get only import declaration syntax.
      const body = getImportDeclaration(esLintProgram.body);

      // if we get, read imported file recursive.
      for (let i = 0, len = body.length; i < len; i++) {
        // TODO: support other types? (value might be RegExp, or number, boolean.)
        const source = String(body[i].source.value);

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

  private getProps = (tokens: Token[]) => {
    try {
      const propsDeclaration = JSON.parse(getPropsDeclaration(tokens));

      if (propsDeclaration && propsDeclaration.props) {
        return propsDeclaration.props;
      }

      return '';
    } catch (err) {
      console.warn('failed to analyze props.');

      return '';
    }
  }

  get counter(): FileCounter {
    return this._counter;
  }
}
