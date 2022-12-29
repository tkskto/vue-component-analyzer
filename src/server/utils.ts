import {
  ESLintImportDeclaration,
  ESLintModuleDeclaration,
  ESLintStatement,
} from 'vue-eslint-parser/ast/nodes';
import {Token} from 'vue-eslint-parser/ast/tokens';
import {model} from './Model';
import {existsSync} from 'fs';
import {resolve, extname, dirname} from 'path';

/**
 * get only Import Declaration syntax.
 * @param {Node[]} nodeArr
 */
export const getImportDeclaration = (nodeArr: (ESLintStatement | ESLintModuleDeclaration)[]): ESLintImportDeclaration[] => {
  return nodeArr.filter((node) => node.type === 'ImportDeclaration') as ESLintImportDeclaration[];
};

/**
 * get Declaration syntax from Tokens.
 * @param tokens
 * @param targetKeyName
 * @returns {string}
 */
export const getDeclarationSyntax = (tokens: Token[], targetKeyName: 'data' | 'props' | 'defineProps'): string => {
  let isTargetToken = false;
  let result = '{'; // for JSON.parse
  let closedCount = 0;
  // TODO: support Date and Function Type Props.
  const needQuotingTypes = ['Identifier', 'Boolean', 'Keyword'];

  for (const token of tokens) {
    const {type, value} = token;
    // waiting to see starting the declaration of target.
    if (isTargetToken || (!isTargetToken && type === 'Identifier' && value === targetKeyName)) {
      const needQuoting = needQuotingTypes.includes(type);
      isTargetToken = true;

      if (['(', ')'].includes(value)) {
        continue;
      }

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

      if (value === 'defineProps') {
        result += ':';
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
  const dirnameOfCurrentFile = dirname(_currentFileName);

  if (_filename.startsWith('../')) {
    filename = resolve(dirnameOfCurrentFile, _filename);
  } else if (_filename.startsWith('./')) {
    filename = `${dirnameOfCurrentFile}/${_filename.replace(/\.\/|/ug, '')}`;
  } else if (_filename.startsWith('~') || _filename.startsWith('@')) {
    filename = _filename.replace('~', model.resourceRoot).replace('@', model.resourceRoot);
  }

  if (filename) {
    if (extname(filename) === '') {
      if (existsSync(`${filename}.vue`)) {
        return `${filename}.vue`;
      } else if (existsSync(`${filename}.js`)) {
        return `${filename}.js`;
      } else if (existsSync(`${filename}.ts`)) {
        return `${filename}.ts`;
      }
    }
  }

  return filename;
};
