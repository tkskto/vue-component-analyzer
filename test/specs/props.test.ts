import {platform} from 'os';
import {existsSync, writeFileSync, readFileSync} from 'fs';
import {join, dirname} from 'path';
import assert from 'assert';
const mkdirp = require('mkdirp');
const {Analyzer} = require('../../src/server/Analyzer');
const fixturesDir = join(__dirname, '../fixture/');
const snapshotDir = platform() === 'win32' ? join(__dirname, '../snapshots/win32') : join(__dirname, '../snapshots/');
const isUpdate = process.argv.includes('--update');

const analyzer = new Analyzer();

describe('props test', () => {
  it('oneProps.vue', async () => {
    const filename = 'propsTest/oneProps';
    const declaration = await analyzer.getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), true);
    const expectedFilePath = join(snapshotDir, `${filename}.json`);
    const json = JSON.stringify(declaration).slice(0);

    if (!existsSync(expectedFilePath) || isUpdate) {
      await mkdirp(dirname(expectedFilePath));
      writeFileSync(expectedFilePath, json);

      console.log(`update snapshot ${expectedFilePath}`);

      return;
    }

    const expected = readFileSync(expectedFilePath, 'utf-8');

    assert.deepStrictEqual(json, expected);
  });


  it('twoProps.vue', async () => {
    const filename = 'propsTest/twoProps';
    const declaration = await analyzer.getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), true);
    const expectedFilePath = join(snapshotDir, `${filename}.json`);
    const json = JSON.stringify(declaration).slice(0);

    if (!existsSync(expectedFilePath) || isUpdate) {
      await mkdirp(dirname(expectedFilePath));
      writeFileSync(expectedFilePath, json);

      console.log(`update snapshot ${expectedFilePath}`);

      return;
    }

    const expected = readFileSync(expectedFilePath, 'utf-8');

    assert.deepStrictEqual(json, expected);
  });
});
