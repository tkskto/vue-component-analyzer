import {getImportDeclarationTree} from './utils';
import {writeFileSync} from 'fs';
import {resolve} from 'path';
import {startServer} from 'browser';
import {FORMAT} from './config';
const program = require('commander'); // eslint-disable-line

// TODO: add log system

// TODO: add error system

try {
  // set commander options.
  program.option('--dir [dir]', 'root directory of src.', 'src');
  program.option('-f, --format [type]', 'Add the specified type of report [browser, json or both]', FORMAT.BROWSER);
  program.option('-o, --out [dir]', 'output directory (enable with setting --format option to "json")', 'out');

  // TODO: add option for output dir?

  const argv = program.parse(process.argv);

  if (argv.format !== FORMAT.BROWSER && argv.format !== FORMAT.JSON && argv.format !== FORMAT.BOTH) {
    console.error(`not support ${argv.format} format.`);
  }

  const rootDir = argv.dir || __dirname;
  const entryFile = 'fixture/importOne.vue'; // TODO: get from cli? just get from dir?
  const children = getImportDeclarationTree(rootDir, entryFile);

  if (argv.format === FORMAT.BOTH) {
    startServer(children);
    writeFileSync(resolve(__dirname, `${argv.out}/result.json`), JSON.stringify(children, null, 4));
  } else if (argv.format === FORMAT.BROWSER) {
    startServer(children);
  } else if (argv.format === FORMAT.JSON) {
    writeFileSync(resolve(__dirname, `${argv.out}/result.json`), JSON.stringify(children, null, 4));
  }
} catch (err) {
  console.error(err.message);
}

export {
  getImportDeclarationTree,
};
