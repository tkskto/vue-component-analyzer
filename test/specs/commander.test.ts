import {getOptions} from '../../src/server/Commander';
import {deepStrictEqual} from 'assert';

describe('commander test', () => {
  test('get default option', () => {
    const option = getOptions([]);

    deepStrictEqual(option, {
      dir: 'src',
      format: 'browser',
      out: 'out',
      port: '8888',
    });
  });
});
