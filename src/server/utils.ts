import {
  ESLintImportDeclaration,
  ESLintModuleDeclaration,
  ESLintStatement,
} from 'vue-eslint-parser/ast/nodes';
import {Token} from 'vue-eslint-parser/ast/tokens';
const {existsSync} = require('fs');
const {resolve, extname, dirname} = require('path');

/**
 * get only Import Declaration syntax.
 * @param {Node[]} nodeArr
 */
export const getImportDeclaration = (nodeArr: (ESLintStatement | ESLintModuleDeclaration)[]): ESLintImportDeclaration[] => { // eslint-disable-line
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
