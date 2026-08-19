import {encodeBase64} from '../../src/client/common';

describe('encodeBase64', () => {
  it('encodes Unicode text as UTF-8', () => {
    expect(encodeBase64('検索')).toBe('5qSc57Si');
  });
});
