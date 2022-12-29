// for execute from npm scripts or commandline.
import {AnalyzeReport} from '../../types';
import {FORMAT} from './Constant';
import {model} from './Model';
import {getOptions} from './Commander';
import {getImportDeclarationTree} from './Analyzer';
import {startServer} from './server';
import {fileCounter} from './FileCounter';
import {writeFileSync} from 'fs';
import {globby} from 'globby';
import path from 'path';
import mkdirp from 'mkdirp';

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

const analyze = (entries: string[]): Promise<AnalyzeReport> => {
  return new Promise((resolve, reject) => {
    try {
      if (entries.length === 0) {
        reject(new Error('There is no entry file.'));

        return;
      }

      const entriesData = [];

      for (let i = 0, len = entries.length; i < len; i++) {
        const entryFile = entries[i];
        const children = getImportDeclarationTree(entryFile, []);

        entriesData.push(children);
      }

      resolve({
        entries: entriesData,
        count: fileCounter.result,
      });
    } catch (err) {
      console.error('something went to wrong at analyze.');
      reject(err);
    }
  });
};

export const analyzeFromCLI = async (): Promise<void> => {
  // get commander options.
  const argv = getOptions(process.argv);

  model.resourceRoot = argv.dir;
  model.format = argv.format;
  model.outDirectory = argv.out;
  model.port = argv.port;
  model.isSilentMode = argv.silent || false;

  if (argv.format !== FORMAT.BROWSER && argv.format !== FORMAT.JSON && argv.format !== FORMAT.BOTH) {
    console.error(`not support ${argv.format} format.`);
  }

  console.log('start analyzing.');

  // get vue entries from dir
  const entries = await globby([argv.dir, '!**/node_modules/**'], {
    expandDirectories: {
      extensions: ['vue'],
    },
  });

  const result = await analyze(entries);

  if (argv.format === FORMAT.BOTH) {
    startServer(argv.port, result);
    writeFileExtra(path.resolve(process.cwd(), `${argv.out}/result.json`), JSON.stringify(result, null, 4));
  } else if (argv.format === FORMAT.BROWSER) {
    startServer(argv.port, result);
  } else if (argv.format === FORMAT.JSON) {
    writeFileExtra(path.resolve(process.cwd(), `${argv.out}/result.json`), JSON.stringify(result, null, 4));
  }

  console.log('finished analyzing.');
};

export {
  analyze,
  getImportDeclarationTree,
  fileCounter,
};
