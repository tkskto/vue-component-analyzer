/*!
  @tkskto/vue-component-analyzer v0.1.2
  https://github.com/tkskto/
  Released under the MIT License.
*/
'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportDeclarationTree = exports.resolveFile = exports.getPropsDeclaration = exports.getImportDeclaration = exports.counter = void 0;
const vue_eslint_parser_1 = require("vue-eslint-parser");
const fs_1 = require("fs");
const path_1 = require("path");
const cwd = process.cwd();
const FileCounter = require('./FileCounter');
exports.counter = new FileCounter();
exports.getImportDeclaration = (nodeArr) => {
    return nodeArr.filter((node) => node.type === 'ImportDeclaration');
};
exports.getPropsDeclaration = (tokens) => {
    let isPropsToken = false;
    let result = '{';
    let closedCount = 0;
    const needQuotingTypes = ['Identifier', 'Boolean', 'Keyword'];
    for (const token of tokens) {
        const { type, value } = token;
        if (isPropsToken || (type === 'Identifier' && value === 'props')) {
            const needQuoting = needQuotingTypes.includes(type);
            isPropsToken = true;
            if (type === 'Punctuator') {
                if (value === '{') {
                    closedCount++;
                }
                else if (value === '}') {
                    closedCount--;
                    if (result[result.length - 1] === ',') {
                        result = result.slice(0, -1);
                    }
                    if (closedCount === 0) {
                        result += '}';
                        break;
                    }
                }
            }
            if (needQuoting) {
                result += '"';
            }
            result += value.replace(/'/ug, '"');
            if (needQuoting) {
                result += '"';
            }
        }
    }
    return `${result}}`;
};
exports.resolveFile = (_filename, _currentFileName) => {
    let filename = '';
    if (_filename.startsWith('../')) {
        filename = path_1.resolve(path_1.dirname(_currentFileName), _filename);
    }
    else if (_filename.startsWith('./')) {
        filename = `${path_1.dirname(_currentFileName)}/${_filename.replace(/\.\/|/ug, '')}`;
    }
    else if (_filename.startsWith('~') || _filename.startsWith('@')) {
        filename = _filename.replace('~', '.').replace('@', '.');
    }
    if (filename) {
        if (path_1.extname(filename) === '' && fs_1.existsSync(`${filename}.vue`)) {
            return `${filename}.vue`;
        }
    }
    return filename;
};
exports.getImportDeclarationTree = (fileName) => {
    const filename = path_1.resolve(cwd, fileName);
    const shortFilename = filename.replace(cwd, '');
    const children = [];
    const result = {
        name: shortFilename,
        props: '',
        children,
    };
    console.log(`read ${filename}.`);
    exports.counter.add(shortFilename);
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
        if (esLintProgram.tokens) {
            const propsDeclaration = JSON.parse(exports.getPropsDeclaration(esLintProgram.tokens));
            if (propsDeclaration && propsDeclaration.props) {
                result.props = propsDeclaration.props;
            }
        }
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
