import {getImportDeclarationTree} from '../../src/utils';
import assert from 'assert';

describe('import declaration test', () => {
  it('importOne.vue', async () => {
    const importOne = await getImportDeclarationTree('test/fixture/importOne.vue');

    assert.strictEqual(JSON.stringify(importOne), '{"name":"/test/fixture/importOne.vue","children":[{"name":"/test/components/child.vue","children":[]}]}');
  });
});
