import {join} from 'path';
import {getImportDeclarationTree} from '../../src/server/Analyzer';
const fixturesDir = join(__dirname, '../fixture/');

describe('import declaration test', () => {
  it('importOne.vue', async () => {
    const filename = 'declarationTest/importOne';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('importTwo.vue', async () => {
    const filename = 'declarationTest/importTwo';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('importThirdParty.vue', async () => {
    const filename = 'declarationTest/importTwo';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('importNestedOne.vue', async () => {
    const filename = 'declarationTest/importNestedOne';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('importNestedTwo.vue', async () => {
    const filename = 'declarationTest/importNestedTwo';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('importNestedTwo.vue', async () => {
    const filename = 'declarationTest/importNestedTwo';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('onlyTemplate.vue', async () => {
    const filename = 'declarationTest/onlyTemplate';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('SJIS.vue', async () => {
    const filename = 'declarationTest/SJIS';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('noExtension.vue', async () => {
    const filename = 'declarationTest/noExtension';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });
});
