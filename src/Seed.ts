/**
 * Data Type of one of Vue File.
 */
import FileReport = vueComponentAnalyzer.FileReport;

export class Seed {
  private _name: string; // file name

  private _props: string; // props string

  private _level: number; // directory level

  private _index: number; // index

  private _children: Seed[] = []; // imported modules from this file.

  private _duplicate = false; // this file is imported from multiple files or not?

  /**
   * @param file - filename
   * @param level - hierarchy level of this file
   * @param index - index of this hierarchy line
   */
  constructor(file: FileReport, private level: number, private index: number) {
    this._name = file.name;
    this._props = file.props;
    this._level = level;
    this._index = index;
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
    let fileClassName = '';

    if (this._children.length > 0) {
      childHTML = this.renderChildren();
    } else {
      seedClassName = ' -no-child';
    }

    if (this._duplicate) {
      fileClassName = ' -duplicate';
    }

    return `<div class="seed${seedClassName}">
      <span class="file"><span class="filename${fileClassName}">${contents}</span></span>
      ${childHTML}
    </div>`;
  }

  get children(): Seed[] {
    return this._children;
  }

  set children(value: Seed[]) {
    this._children = value;
  }

  get duplicate(): boolean {
    return this._duplicate;
  }

  set duplicate(value: boolean) {
    this._duplicate = value;
  }
}
