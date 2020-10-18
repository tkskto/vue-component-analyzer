import {getImportDeclarationTree} from '../../src/utils';
import {existsSync, writeFileSync, readFileSync} from 'fs';
import {join, dirname} from 'path';
import assert from 'assert';
const mkdirp = require('mkdirp');
const fixturesDir = join(__dirname, '../fixture/');
const snapshotDir = join(__dirname, '../snapshots/');
const isUpdate = process.argv.includes('--update');

describe('props test', () => {
  it('oneProps.vue', async () => {
    const filename = 'propsTest/oneProps';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), true);
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
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), true);
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
