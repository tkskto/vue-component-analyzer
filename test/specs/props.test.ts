import {join} from 'path';
import {getImportDeclarationTree} from '../../src/server/Analyzer';
const fixturesDir = join(__dirname, '../fixture/');

describe('props test', () => {
  it('oneProps.vue', async () => {
    const filename = 'propsTest/oneProps';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('twoProps.vue', async () => {
    const filename = 'propsTest/twoProps';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });
});
