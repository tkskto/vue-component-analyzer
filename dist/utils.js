/*!
  @tkskto/vue-component-analyzer v0.0.6
  https://github.com/tkskto/
  Released under the MIT License.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportDeclarationTree = exports.resolveFile = exports.getImportDeclaration = void 0;
const vue_eslint_parser_1 = require("vue-eslint-parser");
const fs_1 = require("fs");
const path_1 = require("path");
const cwd = process.cwd();
exports.getImportDeclaration = (nodeArr) => {
    return nodeArr.filter((node) => node.type === 'ImportDeclaration');
};
exports.resolveFile = (_filename, _currentFileName) => {
    if (_filename.startsWith('../')) {
        const filename = _filename.replace(/\.\.\//ug, '');
        return path_1.extname(filename) === '.vue' ? filename : path_1.extname(filename) !== '' ? filename : `${filename}.vue`;
    }
    else if (_filename.startsWith('./')) {
        const filename = `${path_1.dirname(_currentFileName)}/${_filename.replace(/\.\/|/ug, '')}`;
        return path_1.extname(filename) === '.vue' ? filename : path_1.extname(filename) !== '' ? filename : `${filename}.vue`;
    }
    else if (_filename.startsWith('~') || _filename.startsWith('@')) {
        const filename = _filename.replace('~', '.').replace('@', '.');
        return path_1.extname(filename) === '.vue' ? filename : path_1.extname(filename) !== '' ? filename : `${filename}.vue`;
    }
    return '';
};
exports.getImportDeclarationTree = (fileName) => {
    const filename = path_1.resolve(cwd, fileName);
    const children = [];
    const result = {
        name: filename.replace(cwd, ''),
        children,
    };
    console.log(`read ${filename}.`);
    if (path_1.extname(filename) !== '.vue') {
        return result;
    }
    try {
        const file = fs_1.readFileSync(filename, 'utf-8');
        const parserOption = {
            ecmaVersion: 2018,
            sourceType: 'module',
        };
        const esLintProgram = vue_eslint_parser_1.parse(file, parserOption);
        const body = exports.getImportDeclaration(esLintProgram.body);
        for (let i = 0, len = body.length; i < len; i++) {
            const source = String(body[i].source.value);
            if (source) {
                const nextFilename = exports.resolveFile(source, filename);
                if (nextFilename) {
                    children.push(exports.getImportDeclarationTree(nextFilename));
                }
            }
        }
    }
    catch (err) {
        console.error(`Something went wrong with reading ${filename}`);
        console.error(err.message);
    }
    return result;
};
