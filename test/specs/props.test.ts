import {join} from 'path';
import {getImportDeclarationTree} from '../../src/server/Analyzer';
const fixturesDir = join(__dirname, '../fixture/');

describe('props test', () => {
  it('oneProps.vue', () => {
    const filename = 'propsTest/oneProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('nameOnlyProps.vue', () => {
    const filename = 'propsTest/nameOnlyProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: ['foo'],
      size: 100,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('typeOnlyProps.vue', () => {
    const filename = 'propsTest/typeOnlyProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: {
        title: 'String',
        likes: 'Number',
      },
      size: 142,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('twoProps.vue', () => {
    const filename = 'propsTest/twoProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('defineNameOnlyProps.vue', () => {
    const filename = 'propsTest/defineNameOnlyProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: ['foo'],
      size: 222,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('defineTwoProps.vue', () => {
    const filename = 'propsTest/defineTwoProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
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


  it('defineTypeOnlyProps.vue', () => {
    const filename = 'propsTest/defineTypeOnlyProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: {
        title: 'String',
        likes: 'Number',
      },
      size: 112,
      lastModifiedTime: 0,
      children: [],
    });
  });



  it('defineTypeOnlyPropsVariables.vue', () => {
    const filename = 'propsTest/defineTypeOnlyPropsVariables';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: {
        title: 'String',
        likes: 'Number',
      },
      size: 112,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('defineTypeOnlyPropsWithTypeScript.vue', () => {
    const filename = 'propsTest/defineTypeOnlyPropsWithTypeScript';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: {
        title: 'string',
        likes: 'number',
      },
      size: 125,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('defineTypeOnlyPropsVariablesWithTypeScript.vue', () => {
    const filename = 'propsTest/defineTypeOnlyPropsVariablesWithTypeScript';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: {
        foo: 'string',
        bar: '[number]',
      },
      size: 125,
      lastModifiedTime: 0,
      children: [],
    });
  });
});
