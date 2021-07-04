// for execute from npm scripts or commandline.

import {FORMAT} from './Constant';
import {model} from './Model';
const {Analyzer} = require('./Analyzer');
const {startServer} = require('./server');
const {writeFileSync} = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const {program} = require('commander');
const globby = require('globby');

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
    program.option('--dir [dir]', 'root directory of src.', 'src');
    program.option('-f, --format [type]', 'Add the specified type of report [browser, json or both]', FORMAT.BROWSER);
    program.option('-o, --out [dir]', 'output directory (enable with setting --format option to "json" or "both")', 'out');
    program.option('-p, --port [number]', 'select a port number for the local server', '8888');
    program.option('--silent', 'do not show logs with silent flag');
    program.parse(process.argv);

    const argv = program.opts();

    model.resourceRoot = argv.dir;
    model.format = argv.format;
    model.outDirectory = argv.out;
    model.port = argv.port;
    model.isSilentMode = argv.silent || false;

    if (argv.format !== FORMAT.BROWSER && argv.format !== FORMAT.JSON && argv.format !== FORMAT.BOTH) {
      console.error(`not support ${argv.format} format.`);
    }

    console.log('start analyzing.');

    const analyzer = new Analyzer();

    // get vue entries from dir
    const entries = await globby([argv.dir, '!**/node_modules/**'], {
      expandDirectories: {
        extensions: ['vue'],
      },
    });

    if (entries.length === 0) {
      console.log('There is no entry file.');
    }

    const entriesData = [];

    for (let i = 0, len = entries.length; i < len; i++) {
      const entryFile = entries[i];
      const children = analyzer.getImportDeclarationTree(entryFile, []);

      entriesData.push(children);
    }

    const result = {
      entries: entriesData,
      count: analyzer.counter.count,
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
