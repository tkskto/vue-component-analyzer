import {getImportDeclarationTree, counter} from '../../src/utils';
import {existsSync, writeFileSync, readFileSync} from 'fs';
import {join, dirname} from 'path';
import assert from 'assert';
const mkdirp = require('mkdirp');
const fixturesDir = join(__dirname, '../fixture/');
const snapshotDir = join(__dirname, '../snapshots/');
const isUpdate = process.argv.includes('--update');

describe('counter\'s count test', () => {
  it('counterTest.vue', async () => {
    const filename = 'counterTest/counterTest';
    await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`));
    const expectedFilePath = join(snapshotDir, `${filename}.json`);
    const json = JSON.stringify(counter.count);

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
