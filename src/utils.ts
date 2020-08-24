import {parse} from 'vue-eslint-parser';
import {ESLintImportDeclaration, Node} from 'vue-eslint-parser/ast/nodes';
import {readFileSync} from 'fs';
import {resolve} from 'path';
import Report = vueComponentAnalyzer.Report;

/**
 * get only Import Declaration syntax.
 * @param {Node[]} nodeArr
 */
export const getImportDeclaration = (nodeArr: Node[]): ESLintImportDeclaration[] => {
  return nodeArr.filter((node) => {
    return node.type === 'ImportDeclaration';
  }) as ESLintImportDeclaration[];
}

/**
 * TODO: add comment.
 * @param _filename
 */
export const resolveFile = (_filename: string) => {
  // support relative path and nuxt alias.
  if (_filename.startsWith('.') || _filename.startsWith('~') || _filename.startsWith('@')) {
    // TODO: resolve same directories line start from [./].
    const filename = _filename.replace(/\.\.\//g, '');

    return filename.slice(-4) === '.vue' ? filename : `${filename}.vue`;
  }

  return '';
}

export const getImportDeclarationTree = (rootDir: string, fileName: string): Report => {
  const filename = resolve(__dirname, rootDir, fileName);
  const children: Report[] = [];
  const result: Report = {
    name: filename,
    children
  }

  console.log(`read ${filename}...`);

  // TODO: add await
  try {
    const file = readFileSync(filename, 'utf-8');
    const parserOption = {
      sourceType: 'module'
    }

    // using vue-eslint-parser package.
    const esLintProgram = parse(file, parserOption);

    // get only import declaration syntax.
    const body = getImportDeclaration(esLintProgram.body);

    // if we get, read imported file recursive.
    for (let i = 0, len = body.length; i < len; i++) {
      // TODO: support other type? value might be RegExp, or number, boolean.
      const source = String(body[i].source.value);

      if (source) {
        const filename = resolveFile(source);

        if (filename) {
          children.push(getImportDeclarationTree(rootDir, filename));
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  }

  return result;
}
