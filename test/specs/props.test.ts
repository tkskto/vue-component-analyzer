import {getImportDeclarationTree} from '../../src/utils';
import {existsSync, writeFileSync, readFileSync} from 'fs';
import {join, dirname} from 'path';
import assert from 'assert';
const mkdirp = require('mkdirp');
const fixturesDir = join(__dirname, '../fixture/');
const snapshotDir = join(__dirname, '../snapshots/');

describe('props test', () => {
  it('oneProps.vue', async () => {
    const filename = 'propsTest/oneProps';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`));
    const expectedFilePath = join(snapshotDir, `${filename}.json`);
    const json = JSON.stringify(declaration).slice(0);

    if (!existsSync(expectedFilePath) || process.env.UPDATE_SNAPSHOT) {
      await mkdirp(dirname(expectedFilePath));
      writeFileSync(expectedFilePath, json);

      console.log(`update snapshot ${expectedFilePath}`);

      return;
    }

    const expected = readFileSync(expectedFilePath, 'utf-8');

    assert.deepStrictEqual(json, expected);
  });
});
