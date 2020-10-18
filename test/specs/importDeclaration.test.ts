import {getImportDeclarationTree} from '../../src/utils';
import {existsSync, writeFileSync, readFileSync} from 'fs';
import {join, dirname} from 'path';
import assert from 'assert';
const mkdirp = require('mkdirp');
const fixturesDir = join(__dirname, '../fixture/');
const snapshotDir = join(__dirname, '../snapshots/');
const isUpdate = process.argv.includes('--update');

describe('import declaration test', () => {
  it('importOne.vue', async () => {
    const filename = 'declarationTest/importOne';
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


  it('importTwo.vue', async () => {
    const filename = 'declarationTest/importTwo';
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


  it('importThirdParty.vue', async () => {
    const filename = 'declarationTest/importTwo';
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


  it('importNestedOne.vue', async () => {
    const filename = 'declarationTest/importNestedOne';
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


  it('importNestedTwo.vue', async () => {
    const filename = 'declarationTest/importNestedTwo';
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


  it('importNestedTwo.vue', async () => {
    const filename = 'declarationTest/importNestedTwo';
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


  it('onlyTemplate.vue', async () => {
    const filename = 'declarationTest/onlyTemplate';
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


  it('SJIS.vue', async () => {
    const filename = 'declarationTest/SJIS';
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


  it('noExtension.vue', async () => {
    const filename = 'declarationTest/noExtension';
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
