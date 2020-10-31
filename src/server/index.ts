// for execute from npm scripts or commandline.

const {getImportDeclarationTree, counter} = require('./utils');
const {startServer} = require('./server');
const {writeFileSync} = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const commander = require('commander');
const globby = require('globby');

const FORMAT = {
  BROWSER: 'browser',
  JSON: 'json',
  BOTH: 'both',
};

// TODO: add log system
// TODO: add error system

function writeFileExtra(filename: string, data: string) {
  mkdirp(path.dirname(filename)).then(() => {
    writeFileSync(filename, data);
  }).catch((err: Error) => {
    if (err) {
      throw new Error(err.message);
    }
  });
}

(async () => {
  try {
    // set commander options.
    commander.option('--dir [dir]', 'root directory of src.', 'src');
    commander.option('-f, --format [type]', 'Add the specified type of report [browser, json or both]', FORMAT.BROWSER);
    commander.option('-o, --out [dir]', 'output directory (enable with setting --format option to "json" or "both")', 'out');
    commander.option('-p, --port [number]', 'select a port number for the local server', '8888');

    const argv = commander.parse(process.argv);

    if (argv.format !== FORMAT.BROWSER && argv.format !== FORMAT.JSON && argv.format !== FORMAT.BOTH) {
      console.error(`not support ${argv.format} format.`);
    }

    // get vue entries from dir
    const entries = await globby([argv.dir], {
      expandDirectories: {
        extensions: ['vue'],
      },
    });

    const entriesData = [];

    for (let i = 0, len = entries.length; i < len; i++) {
      const entryFile = entries[i];
      const children = getImportDeclarationTree(entryFile);

      entriesData.push(children);
    }

    const result = {
      entries: entriesData,
      count: counter.count,
    };

    if (argv.format === FORMAT.BOTH) {
      startServer(argv.port, result);
      writeFileExtra(path.resolve(process.cwd(), `${argv.out}/result.json`), JSON.stringify(result, null, 4));
    } else if (argv.format === FORMAT.BROWSER) {
      startServer(argv.port, result);
    } else if (argv.format === FORMAT.JSON) {
      writeFileExtra(path.resolve(process.cwd(), `${argv.out}/result.json`), JSON.stringify(result, null, 4));
    }

    console.log('finished analyzing.');
  } catch (err) {
    console.error(err.message);
  }
})();
