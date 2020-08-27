import {getImportDeclarationTree} from './utils';
import {writeFileSync} from 'fs';
import {resolve} from 'path';
const program = require('commander');

// TODO: add log system
// TODO: add error system

try {
  // set commander options.
  program.option('--dir [dir]', 'root directory of src.', "src");
  program.option('-f, --format [type]', 'Add the specified type of report [browser, json or both]', 'browser');
  program.option('-o, --out [dir]', 'output directory (enable with setting --format option to "json")', 'out');

  const argv = program.parse(process.argv);
  const rootDir = argv.dir || __dirname;
  const entryFile = 'fixture/importOne.vue'; // TODO: get from cli? just get from dir?
  const children = getImportDeclarationTree(rootDir, entryFile);

  // TODO: separate process based on formatter type.
  writeFileSync(resolve(__dirname, `${argv.out}/result.json`), JSON.stringify(children, null, 4));
} catch (err) {
  console.error(err.message);
}

export {
  getImportDeclarationTree
}
