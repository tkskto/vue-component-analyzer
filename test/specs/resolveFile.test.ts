import {resolveFile} from '../../src/server/utils';
import {model} from '../../src/server/Model';

describe('resolveFile', () => {
  beforeAll(() => {
    const pathMaps = new Map<string, string>();

    pathMaps.set('@', process.cwd());
    pathMaps.set('@@', process.cwd());
    pathMaps.set('~', `${process.cwd()}/`);

    model.tsconfigPathMapping = pathMaps;
  });

  it('start with @', () => {
    const result = resolveFile('@/test/components/child.vue', '/test/fixture/declarationTest/importOneWithTypeScript.vue');

    expect(result).toBe(`${process.cwd()}/test/components/child.vue`);
  });

  it('start with @@', () => {
    const result = resolveFile('@@/test/components/child.vue', '/test/fixture/declarationTest/importOneWithTypeScript.vue');

    expect(result).toBe(`${process.cwd()}/test/components/child.vue`);
  });

  it('start with ~', () => {
    const result = resolveFile('~/test/components/child.vue', '/test/fixture/declarationTest/importOneWithTypeScript.vue');

    expect(result).toBe(`${process.cwd()}/test/components/child.vue`);
  });
});
