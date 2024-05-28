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

  it('importOne.vue with script setup', async () => {
    const filename = 'declarationTest/importOneWithSetupScript';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: '/test/fixture/declarationTest/importOneWithSetupScript.vue',
      props: '',
      size: 113,
      lastModifiedTime: 0,
      children: [{
        name: '/test/components/child.vue',
        props: '',
        size: 42,
        lastModifiedTime: 0,
        children: [],
      }],
    });
  });

  it('importOne.vue with TypeScript setup', async () => {
    const filename = 'declarationTest/importOneWithSetupTypeScript';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: '/test/fixture/declarationTest/importOneWithSetupTypeScript.vue',
      props: '',
      size: 123,
      lastModifiedTime: 0,
      children: [{
        name: '/test/components/child.vue',
        props: '',
        size: 42,
        lastModifiedTime: 0,
        children: [],
      }],
    });
  });

  it('importOne.vue with TypeScript', async () => {
    const filename = 'declarationTest/importOneWithTypeScript';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: '/test/fixture/declarationTest/importOneWithTypeScript.vue',
      props: '',
      size: 117,
      lastModifiedTime: 0,
      children: [{
        name: '/test/components/child.vue',
        props: '',
        size: 42,
        lastModifiedTime: 0,
        children: [],
      }],
    });
  });

  it('importOne.vue with src attribute', async () => {
    const filename = 'declarationTest/importOneWithSrcAttribute';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: '/test/fixture/declarationTest/importOneWithSrcAttribute.vue',
      props: '',
      size: 88,
      lastModifiedTime: 0,
      children: [{
        name: '/test/components/child.vue',
        props: '',
        size: 42,
        lastModifiedTime: 0,
        children: [],
      }],
    });
  });

  it('importOneWithDoubleAtSign.vue', async () => {
    const filename = 'declarationTest/importOneWithDoubleAtSign';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });

  it('importOneWithTilde.vue', async () => {
    const filename = 'declarationTest/importOneWithTilde';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });

  it('importOneWithDoubleTilde.vue', async () => {
    const filename = 'declarationTest/importOneWithDoubleTilde';
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

  it('importTwo.vue with script setup', async () => {
    const filename = 'declarationTest/importTwoWithSetupScript';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: '/test/fixture/declarationTest/importTwoWithSetupScript.vue',
      props: '',
      size: 164,
      lastModifiedTime: 0,
      children: [
        {
          name: '/test/components/child.vue',
          props: '',
          size: 42,
          lastModifiedTime: 0,
          children: [],
        },
        {
          name: '/test/components/child2.vue',
          props: '',
          size: 43,
          lastModifiedTime: 0,
          children: [],
        },
      ]});
  });

  it('importTwo.vue with normal and script setup', async () => {
    const filename = 'declarationTest/importTwoWithNormalAndSetupScript';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: '/test/fixture/declarationTest/importTwoWithNormalAndSetupScript.vue',
      props: '',
      size: 179,
      lastModifiedTime: 0,
      children: [
        {
          name: '/test/components/child.vue',
          props: '',
          size: 42,
          lastModifiedTime: 0,
          children: [],
        },
        {
          name: '/test/components/child2.vue',
          props: '',
          size: 43,
          lastModifiedTime: 0,
          children: [],
        },
      ]});
  });


  it('importThirdParty.vue', async () => {
    const filename = 'declarationTest/importThirdParty';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });

  it('importThirdParty.vue with script setup', async () => {
    const filename = 'declarationTest/importThirdPartyWithSetupScript';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: '/test/fixture/declarationTest/importThirdPartyWithSetupScript.vue',
      props: '',
      size: 131,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('importNestedOne.vue', async () => {
    const filename = 'declarationTest/importNestedOne';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });

  it('importNestedOne.vue with script setup', async () => {
    const filename = 'declarationTest/importNestedOneWithSetupScript';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: '/test/fixture/declarationTest/importNestedOneWithSetupScript.vue',
      props: '',
      size: 119,
      lastModifiedTime: 0,
      children: [{
        name: '/test/components/nestedSetup.vue',
        props: '',
        size: 103,
        lastModifiedTime: 0,
        children: [
          {
            name: '/test/components/child.vue',
            props: '',
            size: 42,
            lastModifiedTime: 0,
            children: [],
          },
        ],
      }],
    });
  });


  it('importNestedTwo.vue', async () => {
    const filename = 'declarationTest/importNestedTwo';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });

  it('importNestedTwo.vue with script setup', async () => {
    const filename = 'declarationTest/importNestedTwoWithSetupScript';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: '/test/fixture/declarationTest/importNestedTwoWithSetupScript.vue',
      props: '',
      size: 173,
      lastModifiedTime: 0,
      children: [{
        name: '/test/components/nested.vue',
        props: '',
        size: 97,
        lastModifiedTime: 0,
        children: [{
          name: '/test/components/child.vue',
          props: '',
          size: 42,
          lastModifiedTime: 0,
          children: [],
        }],
      }, {
        name: '/test/components/nested2Setup.vue',
        props: '',
        size: 141,
        lastModifiedTime: 0,
        children: [{
          name: '/test/components/child.vue',
          props: '',
          size: 42,
          lastModifiedTime: 0,
          children: [],
        }, {name: '/test/components/child2.vue',
          props: '',
          size: 43,
          lastModifiedTime: 0,
          children: []}],
      }],
    });
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

  it('noExtension.vue with script setup', async () => {
    const filename = 'declarationTest/noExtensionWithSetupScript';
    const declaration = await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: '/test/fixture/declarationTest/noExtensionWithSetupScript.vue',
      props: '',
      size: 153,
      lastModifiedTime: 0,
      children: [{
        name: '/test/components/nested.vue',
        props: '',
        size: 97,
        lastModifiedTime: 0,
        children: [{
          name: '/test/components/child.vue',
          props: '',
          size: 42,
          lastModifiedTime: 0,
          children: [],
        }],
      }, {
        name: '/test/assets/module.js',
        props: '',
        size: 19,
        lastModifiedTime: 0,
        children: [],
      }],
    });
  });
});
