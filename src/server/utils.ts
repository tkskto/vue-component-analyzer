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
  } else if (model.tsconfigPathMapping.size > 0) {
    // `@@` should be processed before `@`
    const keys = Array.from(model.tsconfigPathMapping.keys()).sort().reverse();

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const replaceTo = model.tsconfigPathMapping.get(key);

      if (_filename.startsWith(key) && replaceTo) {
        filename = _filename.replace(key, replaceTo);

        break;
      }
    }
  } else if (_filename.startsWith('~') || _filename.startsWith('@')) {
    filename = _filename.replace('~', model.resourceRoot).replace('@', model.resourceRoot);
  }

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
