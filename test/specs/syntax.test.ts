import {join} from 'path';
import {analyzer} from '../../src/server/Analyzer';
const fixturesDir = join(__dirname, '../fixture/');

describe('syntax test', () => {
  it('optionalChaining.vue', async () => {
    const filename = 'syntaxTest/optionalChaining';
    const declaration = await analyzer.getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });

  it('logicalAssignment.vue', async () => {
    const filename = 'syntaxTest/logicalAssignment';
    const declaration = await analyzer.getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });

  it('numericSeparators.vue', async () => {
    const filename = 'syntaxTest/numericSeparators';
    const declaration = await analyzer.getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });
});
