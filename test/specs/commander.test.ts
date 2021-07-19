import {getOptions} from '../../src/server/Commander';
import assert from 'assert';

describe('commander test', () => {
  it('default', () => {
    const option = getOptions([]);

    assert.deepStrictEqual(option, {
      dir: 'src',
      format: 'browser',
      out: 'out',
      port: '8888',
    });
  });
});
