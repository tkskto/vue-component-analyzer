import {
  ESLintImportDeclaration,
  ESLintModuleDeclaration,
  ESLintStatement,
} from 'vue-eslint-parser/ast/nodes';
import {Token} from 'vue-eslint-parser/ast/tokens';
import {model} from './Model';
import {existsSync} from 'fs';
import {resolve, extname, dirname, normalize} from 'path';
import {type TsConfigJson} from 'get-tsconfig';
import {TokenProcessor} from './tokenProcessor';

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
 * @returns {string}
 */
export const getPropsDeclarationSyntax = (tokens: Token[]): string => {
  let isInTargetToken = false;
  let processor: TokenProcessor | null = null;

  for (const token of tokens) {
    const {type, value} = token;

    // waiting to see starting the declaration of target.
    if (type === 'Identifier' && value === 'defineProps') {
      isInTargetToken = true;
      processor = new TokenProcessor();
      processor.add(type, value);
    } else if (!isInTargetToken && type === 'Identifier' && value === 'props') {
      isInTargetToken = true;
      processor = new TokenProcessor();
      processor.add(type, value);
    } else if (isInTargetToken) {
      processor?.add(type, value);

      if (processor?.isEnd(value)) {
        break;
      }
    }
  }

  return processor?.finish() || '';
};

const resolveImport = (_filename: string, dirnameOfCurrentFile: string, tsconfigPathMapping: Map<string, string>, resourceRoot: string): string => {
  if (_filename.startsWith('../') || _filename.startsWith('./')) {
    return resolve(dirnameOfCurrentFile, _filename);
  }
  
  if (tsconfigPathMapping.size > 0) {
    // `@@` should be processed before `@`
    const keys = Array.from(tsconfigPathMapping.keys()).sort((rule1, rule2) => rule2.length - rule1.length);

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const replaceTo = tsconfigPathMapping.get(key)?.replace('/*', '/');
      const from = key.replace('/*', '/');

      if (_filename.startsWith(from) && replaceTo) {
        return _filename.replace(from, replaceTo);
      }
    }
  }
  
  if (_filename.startsWith('~') || _filename.startsWith('@')) {
    const remainingPath = _filename.replace(/^[~@]\/?/u, '');

    return resolve(resourceRoot, remainingPath);
  }

  return '';
}

/**
 * get filename from import string. support relative path and nuxt alias.
 * @param _filename
 * @param _currentFileName
 */
export const resolveFile = (_filename: string, _currentFileName: string): string => {
  const dirnameOfCurrentFile = dirname(_currentFileName);
  let filename = resolveImport(_filename, dirnameOfCurrentFile, model.tsconfigPathMapping, model.resourceRoot);

  // filename is empty when import third-party script
  if (filename) {
    filename = normalize(filename);

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

export const getTsConfigPathMapping = (compilerOptions: TsConfigJson.CompilerOptions): Map<string, string> => {
  const {paths, baseUrl} = compilerOptions;
  const pathMaps = new Map<string, string>();

  if (!baseUrl || !paths) {
    return pathMaps;
  }

  for (const key in paths) {
    if (Object.hasOwn(paths, key)) {
      // only use the first path for now.
      pathMaps.set(key.replace('/*', ''), resolve(model.resourceRoot, baseUrl, paths[key][0].replace('/*', '')));
    }
  }

  return pathMaps;
};
