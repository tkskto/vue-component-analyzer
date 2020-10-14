/**
 * Data Type of one of Vue File.
 */
import FileReport = vueComponentAnalyzer.FileReport;

export class Seed {
  private _name: string; // file name

  private _props: string; // props string

  private _level: number; // directory level

  private _index: number; // index

  private _count: number;

  private _children: Seed[] = []; // imported modules from this file.

  /**
   * @param file - filename
   * @param level - hierarchy level of this file
   * @param index - index of this hierarchy line
   * @param count - number of files reference this file.
   */
  constructor(file: FileReport, level: number, index: number, count: number) {
    this._name = file.name;
    this._props = file.props;
    this._level = level;
    this._index = index;
    this._count = count;
  }

  private renderChildren(): string {
    let html = '';

    for (let i = 0, len = this._children.length; i < len; i++) {
      html += this._children[i].render();
    }

    return `<div class="group">
        ${html}
    </div>`;
  }

  private renderWithProps(): string {
    return `<details><summary>${this._name}</summary><pre>${JSON.stringify(this._props, null, '\t')}</pre></details>`;
  }

  public render(): string {
    const contents = this._props ? this.renderWithProps() : this._name;
    let childHTML = '';
    let seedClassName = '';

    if (this._children.length > 0) {
      childHTML = this.renderChildren();
    } else {
      seedClassName = ' -no-child';
    }

    return `<div class="seed${seedClassName}">
      <span class="file">
        <span class="filename">
          <span class="file__text">${contents}</span>
          ${this.getCountText()}
        </span>
      </span>
      ${childHTML}
    </div>`;
  }

  private getCountText(): string {
    if (this._count === 0) {
      return '';
    } else if (this._count === 1) {
      return '<span class="file__count">1 time referenced.</span>';
    }

    return `<span class="file__count">${this._count} times referenced.</span>`;
  }

  get children(): Seed[] {
    return this._children;
  }

  set children(value: Seed[]) {
    this._children = value;
  }
}
