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

describe('import declaration test', () => {
  it('importOne.vue', async () => {
    const filename = 'declarationTest/importOne';
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


  it('importTwo.vue', async () => {
    const filename = 'declarationTest/importTwo';
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


  it('importThirdParty.vue', async () => {
    const filename = 'declarationTest/importTwo';
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


  it('importNestedOne.vue', async () => {
    const filename = 'declarationTest/importNestedOne';
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


  it('importNestedTwo.vue', async () => {
    const filename = 'declarationTest/importNestedTwo';
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


  it('importNestedTwo.vue', async () => {
    const filename = 'declarationTest/importNestedTwo';
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


  it('onlyTemplate.vue', async () => {
    const filename = 'declarationTest/onlyTemplate';
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


  it('SJIS.vue', async () => {
    const filename = 'declarationTest/SJIS';
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


  it('noExtension.vue', async () => {
    const filename = 'declarationTest/noExtension';
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
