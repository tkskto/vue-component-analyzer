import {join} from 'path';
import {getImportDeclarationTree} from '../../src/server/Analyzer';
const fixturesDir = join(__dirname, '../fixture/');

describe('props test', () => {
  it('complicatedProps.vue', () => {
    const filename = 'propsTest/complicatedProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: `props: {
    propA: {
        type: Number,
    },
    propB: {
        type: [String, Number],
    },
    propC: {
        type: String,
        required: true
    },
    propD: {
        type: [String, null],
        required: true
    },
    propE: {
        type: Number,
        default: 100
    },
    propF: {
        type: Object,
        default (rawProps) {
            return {
                message: 'hello'
            }
        }
    },
    propG: {
        validator(value, props) {
            return ['success', 'warning', 'danger'].includes(value)
        }
    },
    propH: {
        type: Function,
        default () {
            return 'Default function'
        }
    },
}`,
      size: 1088,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('defineComplicatedProps.vue', () => {
    const filename = 'propsTest/defineComplicatedProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: `defineProps({
    propA: Number,
    propB: [String, Number],
    propC: {
        type: String,
        required: true
    },
    propD: {
        type: [String, null],
        required: true
    },
    propE: {
        type: Number,
        default: 100
    },
    propF: {
        type: Object,
        default (rawProps) {
            return {
                message: 'hello'
            }
        }
    },
    propG: {
        validator(value, props) {
            return ['success', 'warning', 'danger'].includes(value)
        }
    },
    propH: {
        type: Function,
        default () {
            return 'Default function'
        }
    }
})`,
      size: 1743,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('defineNameOnlyProps.vue', () => {
    const filename = 'propsTest/defineNameOnlyProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: 'defineProps([\'foo\'])',
      size: 84,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('defineTwoProps.vue', () => {
    const filename = 'propsTest/defineTwoProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: `defineProps({
    data: {
        type: String,
        required: true,
        default: '1',
    },
    data2: {
        type: Number,
        required: false,
        default: 1,
    },
})`,
      size: 256,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('defineTypeOnlyProps.vue', () => {
    const filename = 'propsTest/defineTypeOnlyProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: `defineProps({
    title: String,
    likes: Number
})`,
      size: 118,
      lastModifiedTime: 0,
      children: [],
    });
  });



  it('defineTypeOnlyPropsVariables.vue', () => {
    const filename = 'propsTest/defineTypeOnlyPropsVariables';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: `defineProps({
    title: String,
    likes: Number
})`,
      size: 132,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('defineTypeOnlyPropsWithTypeScript.vue', () => {
    const filename = 'propsTest/defineTypeOnlyPropsWithTypeScript';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: `defineProps<{
    title: string,
    likes?: number
}>`,
      size: 128,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('defineTypeOnlyPropsVariablesWithTypeScript.vue', () => {
    const filename = 'propsTest/defineTypeOnlyPropsVariablesWithTypeScript';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: `defineProps<{
    title: string,
    likes?: number
}>`,
      size: 142,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('nameOnlyProps.vue', () => {
    const filename = 'propsTest/nameOnlyProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: 'props: [\'foo\']',
      size: 100,
      lastModifiedTime: 0,
      children: [],
    });
  });


  it('oneProps.vue', () => {
    const filename = 'propsTest/oneProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('twoProps.vue', () => {
    const filename = 'propsTest/twoProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(declaration).slice(0);

    expect(json).toMatchSnapshot();
  });


  it('typeOnlyProps.vue', () => {
    const filename = 'propsTest/typeOnlyProps';
    const declaration = getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);

    expect(declaration).toStrictEqual({
      name: `/test/fixture/${filename}.vue`,
      props: `props: {
    title: String,
    likes: Number
}`,
      size: 144,
      lastModifiedTime: 0,
      children: [],
    });
  });
});
