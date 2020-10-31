import {
  ESLintImportDeclaration,
  ESLintModuleDeclaration,
  ESLintProgram,
  ESLintStatement,
} from 'vue-eslint-parser/ast/nodes';
import {Token} from 'vue-eslint-parser/ast/tokens';
import FileReport = vueComponentAnalyzer.FileReport;
const {parse} = require('vue-eslint-parser');
const {readFileSync, existsSync, statSync} = require('fs');
const {resolve, extname, dirname} = require('path');
const cwd = process.cwd();
const FileCounter = require('./FileCounter');
const counter = new FileCounter();

/**
 * get only Import Declaration syntax.
 * @param {Node[]} nodeArr
 */
const getImportDeclaration = (nodeArr: (ESLintStatement | ESLintModuleDeclaration)[]): ESLintImportDeclaration[] => { // eslint-disable-line
  return nodeArr.filter((node) => node.type === 'ImportDeclaration') as ESLintImportDeclaration[];
};

/**
 * get Props Declaration syntax from Tokens.
 * @param tokens
 */
const getPropsDeclaration = (tokens: Token[]): string => {
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
const resolveFile = (_filename: string, _currentFileName: string): string => {
  let filename = '';

  if (_filename.startsWith('../')) {
    filename = resolve(dirname(_currentFileName), _filename);
  } else if (_filename.startsWith('./')) {
    filename = `${dirname(_currentFileName)}/${_filename.replace(/\.\/|/ug, '')}`;
  } else if (_filename.startsWith('~') || _filename.startsWith('@')) {
    filename = _filename.replace('~', '.').replace('@', '.');
  }

  if (filename) {
    if (extname(filename) === '' && existsSync(`${filename}.vue`)) {
      return `${filename}.vue`;
    }
  }

  return filename;
};

const getImportDeclarationTree = (fileName: string, isTest = false): FileReport => {
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
  counter.add(shortFilename);

  if (extname(filename) === '') {
    return result;
  }

  // get statistic only vue file.
  const stat = statSync(filename);

  if (!isTest) {
    result.lastModifiedTime = Number(stat.mtimeMs.toFixed(0));
  }

  result.size = stat.size;

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
          children.push(getImportDeclarationTree(nextFilename, isTest));
        }
      }
    }
  } catch (err) {
    console.error(`Something went wrong with reading ${filename}`);
    console.error(err.message);
  }

  return result;
};

exports.counter = counter;
exports.getImportDeclarationTree = getImportDeclarationTree;
