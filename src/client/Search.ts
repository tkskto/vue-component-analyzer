import {Model} from './model';

export interface SearchState {
  isMatch: boolean;
  isVisible: boolean;
}

export const normalizeSearchQuery = (query: string): string => query.trim().toLowerCase();

export const getSearchState = (fileName: string, hasMatchingDescendant: boolean, query: string): SearchState => {
  const normalizedQuery = normalizeSearchQuery(query);
  const isMatch = normalizedQuery.length > 0 && fileName.toLowerCase().includes(normalizedQuery);

  return {
    isMatch,
    isVisible: normalizedQuery.length === 0 || isMatch || hasMatchingDescendant,
  };
};

interface FilterResult {
  isVisible: boolean;
  matchCount: number;
}

class Search {
  constructor(
    private _input: HTMLInputElement,
    private _clearButton: HTMLButtonElement,
    private _status: HTMLElement,
    private _model: Model,
  ) {
    this._input.addEventListener('input', this.apply);
    this._clearButton.addEventListener('click', this.clear);
    this._model.addEventListener(Model.EVENT.SETTING_CHANGED, this.onSettingChanged);
    this.updateAvailability();
  }

  private getDirectChild(element: HTMLElement, className: string): HTMLElement | undefined {
    return Array.from(element.children).find((child): child is HTMLElement => child instanceof HTMLElement && child.classList.contains(className));
  }

  private filterSeed(seed: HTMLElement, query: string): FilterResult {
    const group = this.getDirectChild(seed, 'group');
    const children = group ? Array.from(group.children).filter((child): child is HTMLElement => child instanceof HTMLElement && child.classList.contains('seed')) : [];
    let hasMatchingDescendant = false;
    let matchCount = 0;

    children.forEach((child) => {
      const result = this.filterSeed(child, query);

      hasMatchingDescendant ||= result.isVisible;
      matchCount += result.matchCount;
    });

    const file = this.getDirectChild(seed, 'file');
    const fileName = file?.querySelector('summary')?.textContent ?? '';
    const state = getSearchState(fileName, hasMatchingDescendant, query);
    const isFilteredLeaf = query.length > 0 && state.isVisible && !hasMatchingDescendant;

    seed.classList.toggle('-search-hidden', !state.isVisible);
    seed.classList.toggle('-search-match', state.isMatch);
    seed.classList.toggle('-search-no-child', isFilteredLeaf);
    group?.classList.toggle('-search-hidden', query.length > 0 && !hasMatchingDescendant);

    return {
      isVisible: state.isVisible,
      matchCount: matchCount + (state.isMatch ? 1 : 0),
    };
  }

  private updateAvailability(): void {
    const isTextView = this._model.viewType === 'TEXT';

    this._input.disabled = isTextView;
    this._clearButton.disabled = isTextView || normalizeSearchQuery(this._input.value).length === 0;
  }

  private onSettingChanged = (): void => {
    this.updateAvailability();

    if (this._model.viewType === 'GRAPH') {
      this.apply();
    }
  };

  private clear = (): void => {
    this._input.value = '';
    this.apply();
    this._input.focus();
  };

  public apply = (): void => {
    const query = normalizeSearchQuery(this._input.value);
    const roots = document.querySelectorAll<HTMLElement>('.root.html > .seed');
    let matchCount = 0;

    roots.forEach((root) => {
      matchCount += this.filterSeed(root, query).matchCount;
    });

    if (query.length === 0) {
      this._status.textContent = '';
    } else {
      this._status.textContent = `${matchCount} ${matchCount === 1 ? 'match' : 'matches'}`;
    }

    this.updateAvailability();
  };
}

export const setSearch = (model: Model): Search | null => {
  const input = document.querySelector<HTMLInputElement>('#search-file-name');
  const clearButton = document.querySelector<HTMLButtonElement>('#btn-search-clear');
  const status = document.querySelector<HTMLElement>('#search-status');

  if (!input || !clearButton || !status) {
    return null;
  }

  return new Search(input, clearButton, status, model);
};
