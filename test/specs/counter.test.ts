import {platform} from 'os';
import {existsSync, writeFileSync, readFileSync} from 'fs';
import {join, dirname} from 'path';
import assert from 'assert';
import mkdirp from 'mkdirp';
import {analyzer} from '../../src/server/Analyzer';
const fixturesDir = join(__dirname, '../fixture/');
const snapshotDir = platform() === 'win32' ? join(__dirname, '../snapshots/win32') : join(__dirname, '../snapshots/');
const isUpdate = process.argv.includes('--update');

describe('counter\'s count test', () => {
  it('counterTest.vue', async () => {
    const filename = 'counterTest/counterTest';
    await analyzer.getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const expectedFilePath = join(snapshotDir, `${filename}.json`);
    const json = JSON.stringify(analyzer.counter.count);

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
