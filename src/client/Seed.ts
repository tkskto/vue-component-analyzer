/**
 * Data Type of one of Vue File.
 */
import FileReport = vueComponentAnalyzer.FileReport;
import {Model} from './model';

export class Seed {
  private _name: string; // file name

  private _props: string; // props string

  private _fileSize: number; // this file size. (in byte)

  private _lastModifiedTime: number; // Last modified time of this file.

  private _count: number;

  private _children: Seed[] = []; // imported modules from this file.

  /**
   * @param file - filename
   * @param count - number of files reference this file.
   * @param _model - Model instance.
   */
  constructor(file: FileReport, count: number, private _model: Model) {
    this._name = file.name;
    this._props = file.props;
    this._fileSize = file.size;
    this._lastModifiedTime = file.lastModifiedTime;
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

  private renderProps(): string {
    return this._props ? `<pre class="file__props">props: ${JSON.stringify(this._props, null, '\t')}</pre>` : '';
  }

  private renderMetaData(): string {
    const fileSize = (this._fileSize / 1024).toFixed(2);
    const lastUpdated = this._lastModifiedTime === 0 ? 0 : this._model.getHowManyDaysAgo(new Date(this._lastModifiedTime));

    if (fileSize && lastUpdated) {
      return `
        <span class="file__meta">FileSize: ${fileSize} KB</span>
        <span class="file__meta">LastUpdated: ${lastUpdated} days ago</span>
      `;
    }

    return '';
  }

  private renderDetails(): string {
    return `<details>
        <summary>${this._name}</summary>
        ${this.renderProps()}
        ${this.renderMetaData()}
    </details>`;
  }

  public render(): string {
    const contents = this.renderDetails();
    let childHTML = '';
    let seedClassName = '';

    if (this._children.length > 0) {
      childHTML = this.renderChildren();
    } else {
      seedClassName = ' -no-child';
    }

    return `<div class="seed${seedClassName}">
      <div class="file">
        <div class="filename">
          <div class="file__text">${contents}</div>
          ${this.getCountText()}
        </div>
      </div>
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
