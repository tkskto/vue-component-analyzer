import {getSearchState, normalizeSearchQuery} from '../../src/client/Search';

describe('search', () => {
  it('normalizes surrounding spaces and letter case', () => {
    expect(normalizeSearchQuery('  Button.VUE ')).toBe('button.vue');
  });

  it('matches a file name by case-insensitive substring', () => {
    expect(getSearchState('/components/Button.vue', false, 'button')).toEqual({
      isMatch: true,
      isVisible: true,
    });
  });

  it('keeps an ancestor of a matching file visible', () => {
    expect(getSearchState('/pages/Home.vue', true, 'button')).toEqual({
      isMatch: false,
      isVisible: true,
    });
  });

  it('hides an unrelated branch', () => {
    expect(getSearchState('/pages/About.vue', false, 'button')).toEqual({
      isMatch: false,
      isVisible: false,
    });
  });

  it('shows every file for an empty query', () => {
    expect(getSearchState('/pages/About.vue', false, '   ')).toEqual({
      isMatch: false,
      isVisible: true,
    });
  });
});
