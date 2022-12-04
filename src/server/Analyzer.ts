import {FileReport} from '../../types';
import {resolveFile} from './utils';
import {readFileSync, statSync} from 'fs';
import {resolve, extname} from 'path';
import {fileCounter} from './FileCounter';
import {VueComponent} from './VueComponent';
import {model} from './Model';
const cwd = process.cwd();

/**
 * get import tree.
 * @param {string} fileName entry file name
 * @param {string[]} parents entries of file name
 * @param {boolean} isTest whether it through the test. if this doesn't exist lastModifiedTime will always fail on the GitHub Actions.
 */
export const getImportDeclarationTree = (fileName: string, parents: string[] = [], isTest = false): FileReport => {
  const filename = resolve(cwd, fileName);
  // get filename without current working directory.
  const shortFilename = filename.replace(cwd, '');
  // get file statistic
  const stat = statSync(filename);
  // make a filename list for detecting circular dependency.
  const ancestorList: string[] = parents.concat();

  ancestorList.push(fileName);

  if (!model.isSilentMode) {
    console.log(`read ${filename}`);
  }

  // increment count of this file.
  fileCounter.add(shortFilename);

  // if this file is not Vue Component file, return only filename and stat.
  if (extname(filename) === '' || extname(filename) !== '.vue') {
    return {
      name: shortFilename,
      props: '',
      size: stat.size,
      lastModifiedTime: isTest ? 0 : Number(stat.mtimeMs.toFixed(0)),
      children: [],
    };
  }

  const contents = readFileSync(filename, 'utf-8');
  const component = new VueComponent(shortFilename, contents, stat);

  try {
    // if we get, read imported file recursive.
    for (let i = 0, len = component.importDeclaration.length; i < len; i++) {
      // TODO: support other types? (value might be RegExp, or number, boolean.)
      const source = String(component.importDeclaration[i].source.value);

      if (source) {
        const nextFilename = resolveFile(source, filename);

        if (nextFilename) {
          if (parents.includes(nextFilename)) {
            console.warn(`Circular dependency detected between ${nextFilename} and ${filename}`);
          } else {
            component.addChildReport(getImportDeclarationTree(nextFilename, ancestorList, isTest));
          }
        }
      }
    }
  } catch (err) {
    console.error(`Something went wrong with reading ${filename}`);
    if (err instanceof Error) {
      console.error(err.message);
    }
  }

  return component.getFileReport(isTest);
};
