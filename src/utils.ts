import {parse} from 'vue-eslint-parser';
import {ESLintImportDeclaration, Node} from 'vue-eslint-parser/ast/nodes';
import {Token} from 'vue-eslint-parser/ast/tokens';
import {readFileSync} from 'fs';
import {resolve, extname, dirname} from 'path';
import FileReport = vueComponentAnalyzer.FileReport;
const cwd = process.cwd();

/**
 * get only Import Declaration syntax.
 * @param {Node[]} nodeArr
 */
export const getImportDeclaration = (nodeArr: Node[]): ESLintImportDeclaration[] => { // eslint-disable-line
  return nodeArr.filter((node) => node.type === 'ImportDeclaration') as ESLintImportDeclaration[];
};

/**
 * get Props Declaration syntax from Tokens.
 * @param tokens
 */
export const getPropsDeclaration = (tokens: Token[]): string => {
  let isPropsToken = false;
  let result = '{'; // for JSON.parse
  let closedCount = 0;
  // TODO: support Date and Function Type Props.
  const needQuotingTypes = ['Identifier', 'Boolean', 'Keyword'];

  for (const token of tokens) {
    const {type, value} = token;
    // waiting to see starting the declaration of props.
    if (isPropsToken || (type === 'Identifier' && value === 'props')) {
      const needQuoting = needQuotingTypes.includes(type);
      isPropsToken = true;

      if (type === 'Punctuator') {
        // count brace for finding end of the declaration.
        if (value === '{') {
          closedCount++;
        } else if (value === '}') {
          closedCount--;

          // remove trailing comma for JSON.
          if (result[result.length - 1] === ',') {
            result = result.slice(0, -1);
          }

          if (closedCount === 0) {
            result += '}';
            break;
          }
        }
      }

      // put left-hand quotation for JSON.
      if (needQuoting) {
        result += '"';
      }

      // change quotation to double for JSON.
      result += value.replace(/'/ug, '"');

      // put right-hand quotation for JSON.
      if (needQuoting) {
        result += '"';
      }
    }
  }

  return `${result}}`;
};

/**
 * get filename from import string. support relative path and nuxt alias.
 * @param _filename
 * @param _currentFileName
 */
export const resolveFile = (_filename: string, _currentFileName: string): string => {
  // TODO: support no extension type.
  if (_filename.startsWith('../')) {
    const filename = _filename.replace(/\.\.\//ug, '');

    return extname(filename) === '.vue' ? filename : extname(filename) !== '' ? filename : `${filename}.vue`;
  } else if (_filename.startsWith('./')) {
    const filename = `${dirname(_currentFileName)}/${_filename.replace(/\.\/|/ug, '')}`;

    return extname(filename) === '.vue' ? filename : extname(filename) !== '' ? filename : `${filename}.vue`;
  } else if (_filename.startsWith('~') || _filename.startsWith('@')) {
    const filename = _filename.replace('~', '.').replace('@', '.');

    return extname(filename) === '.vue' ? filename : extname(filename) !== '' ? filename : `${filename}.vue`;
  }

  return '';
};

export const getImportDeclarationTree = (fileName: string): FileReport => {
  const filename = resolve(cwd, fileName);
  const children: FileReport[] = [];
  const result: FileReport = {
    name: filename.replace(cwd, ''),
    props: '',
    children,
  };

  console.log(`read ${filename}.`);

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
    const esLintProgram = parse(file, parserOption);

    if (esLintProgram.tokens) {
      const propsDeclaration = JSON.parse(getPropsDeclaration(esLintProgram.tokens));

      if (propsDeclaration && propsDeclaration.props) {
        result.props = propsDeclaration.props;
      }
    }

    // get only import declaration syntax.
    const body = getImportDeclaration(esLintProgram.body);

    // if we get, read imported file recursive.
    for (let i = 0, len = body.length; i < len; i++) {
      // TODO: support other type? (value might be RegExp, or number, boolean.)
      const source = String(body[i].source.value);

      if (source) {
        const nextFilename = resolveFile(source, filename);

        if (nextFilename) {
          children.push(getImportDeclarationTree(nextFilename));
        }
      }
    }
  } catch (err) {
    console.error(`Something went wrong with reading ${filename}`);
    console.error(err.message);
  }

  return result;
};
