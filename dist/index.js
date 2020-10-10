/**
 * see license.txt
 */

/*!
  @tkskto/vue-component-analyzer v0.1.1
  https://github.com/tkskto/
  Released under the MIT License.
*/
'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("./utils");
const server_1 = require("./server");
const fs_1 = require("fs");
const path_1 = tslib_1.__importDefault(require("path"));
const mkdirp = require('mkdirp');
const commander = require('commander');
const globby = require('globby');
const FORMAT = {
    BROWSER: 'browser',
    JSON: 'json',
    BOTH: 'both',
};
function writeFileExtra(filename, data) {
    mkdirp(path_1.default.dirname(filename)).then(() => {
        fs_1.writeFileSync(filename, data);
    }).catch((err) => {
        if (err) {
            throw new Error(err.message);
        }
    });
}
(async () => {
    try {
        commander.option('--dir [dir]', 'root directory of src.', 'src');
        commander.option('-f, --format [type]', 'Add the specified type of report [browser, json or both]', FORMAT.BROWSER);
        commander.option('-o, --out [dir]', 'output directory (enable with setting --format option to "json" or "both")', 'out');
        commander.option('-p, --port [number]', 'select a port number for the local server', '8888');
        const argv = commander.parse(process.argv);
        if (argv.format !== FORMAT.BROWSER && argv.format !== FORMAT.JSON && argv.format !== FORMAT.BOTH) {
            console.error(`not support ${argv.format} format.`);
        }
        const entries = await globby([argv.dir], {
            expandDirectories: {
                extensions: ['vue'],
            },
        });
        const entriesData = [];
        for (let i = 0, len = entries.length; i < len; i++) {
            const entryFile = entries[i];
            const children = utils_1.getImportDeclarationTree(entryFile);
            entriesData.push(children);
        }
        const result = {
            entries: entriesData,
        };
        if (argv.format === FORMAT.BOTH) {
            server_1.startServer(argv.port, result);
            writeFileExtra(path_1.default.resolve(process.cwd(), `${argv.out}/result.json`), JSON.stringify(result, null, 4));
        }
        else if (argv.format === FORMAT.BROWSER) {
            server_1.startServer(argv.port, result);
        }
        else if (argv.format === FORMAT.JSON) {
            writeFileExtra(path_1.default.resolve(process.cwd(), `${argv.out}/result.json`), JSON.stringify(result, null, 4));
        }
        console.log('finished analyzing.');
    }
    catch (err) {
        console.error(err.message);
    }
})();
