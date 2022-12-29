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


  it('defineTwoProps.vue', async () => {
    const filename = 'propsTest/defineTwoProps';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: '/test/fixture/propsTest/defineTwoProps.vue',
      props: {
        data: {
          type: 'String',
          required: 'true',
          default: '1',
        },
        data2: {
          type: 'Number',
          required: 'false',
          default: 1,
        },
      },
      size: 222,
      lastModifiedTime: 0,
      children: [],
    });
  });
});
