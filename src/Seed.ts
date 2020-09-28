/**
 * Data Type of one of Vue File.
 */
export class Seed {
  private _name: string; // file name

  private _level: number; // directory level

  private _index: number; // index

  private _children: Seed[] = []; // imported modules from this file.

  private _duplicate = false; // this file is imported from multiple files or not?

  /**
   * @param name - filename
   * @param level - hierarchy level of this file
   * @param index - index of this hierarchy line
   */
  constructor(private name: string, private level: number, private index: number) {
    this._name = name;
    this._level = level;
    this._index = index;
  }

  private renderChildren():string {
    let html = '';

    for (let i = 0, len = this._children.length; i < len; i++) {
      html += this._children[i].render();
    }

    return `<div class="group">
        ${html}
    </div>`;
  }

  public render(): string {
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
      <span class="file"><span class="filename${fileClassName}">${this._name}</span></span>
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
