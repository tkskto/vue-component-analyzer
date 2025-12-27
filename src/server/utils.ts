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

  // Nuxt-style aliases: '@', '@@', '~', '~~'
  // Support both with-slash (e.g. '@/foo') and missing-slash (e.g. '@foo') forms.
  // The missing-slash form will be normalized by joining with resourceRoot and is later validated by resolveFile's existence checks to avoid treating scoped packages like '@vueuse/core' as local files.
  const aliasWithSlashPrefixes = ['@@/', '~~/', '@/', '~/'];
  const aliasPrefix = aliasWithSlashPrefixes.find((p) => _filename.startsWith(p));

  if (aliasPrefix) {
    const remainingPath = _filename.slice(aliasPrefix.length);

    return resolve(resourceRoot, remainingPath);
  }

  const aliasWithoutSlash = _filename.match(/^(?<alias>@@|~~|@|~)(?!\/)/u);

  if (aliasWithoutSlash && aliasWithoutSlash.groups) {
    const {alias} = aliasWithoutSlash.groups;
    const remainder = _filename.slice(alias.length);
    const normalizedRemainder = remainder.startsWith('/') ? remainder.slice(1) : remainder;

    return resolve(resourceRoot, normalizedRemainder);
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
  if (!filename) {
    return '';
  }

  filename = normalize(filename);

  // If extension is omitted, try common source extensions.
  if (extname(filename) === '') {
    if (existsSync(`${filename}.vue`)) {
      return `${filename}.vue`;
    }

    if (existsSync(`${filename}.js`)) {
      return `${filename}.js`;
    }

    if (existsSync(`${filename}.ts`)) {
      return `${filename}.ts`;
    }
  
    // Not a resolvable local file; treat as external.
    return '';
  }

  // If an explicit extension is provided, ensure the file exists.
  return existsSync(filename) ? filename : '';
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
