// for execute from browser.

import {Seed} from './Seed';
import {Model} from './model';
import FileReport = vueComponentAnalyzer.FileReport;

export class Renderer {
  private readonly _app: HTMLElement | null;

  private _tree: Seed[][] = [];

  constructor(private _model: Model) {
    this._app = document.getElementById('app');

    _model.addEventListener(Model.EVENT.DATA_UPDATE, this.ready);
  }

  /**
   * generate seed object from json.
   * @param data
   * @param seed
   * @private
   */
  private generateSeed(data: FileReport, seed: Seed): Seed[] {
    const tree: Seed[] = [];
    const {children} = data;
    const childSeeds: Seed[] = [];
    const {count} = this._model.data;

    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];
      const childSeed = new Seed(child, count[child.name], this._model);

      childSeeds.push(childSeed);

      this.generateSeed(child, childSeed);
    }

    seed.children = childSeeds;
    tree.push(seed);

    return tree;
  }

  private ready = () => {
    if ('GRAPH' === this._model.viewType) {
      const {data} = this._model;
      const {entries} = data;

      for (let i = 0, len = entries.length; i < len; i++) {
        const entry = entries[i];

        if (data) {
          const root = new Seed(entry, 0, this._model);

          this._tree.push(this.generateSeed(entry, root));
        }
      }
    }

    this.render();
  };

  private renderLine(name: string, level: number, isLast: boolean): string {
    let line = ' ';

    for (let i = 0; i < level; i++) {
      line += '│   ';
    }

    line += isLast ? '└─ ' : '├─ ';
    line += name;

    return `${line}\n`;
  }

  private renderEntry(entry: FileReport, level: number): string {
    let result = '';

    for (let i = 0, len = entry.children.length; i < len; i++) {
      const child = entry.children[i];

      result += this.renderLine(child.name, level, i === (len - 1));
      result += this.renderEntry(child, level + 1);
    }

    return result;
  }

  /**
   * rendering DOM from tree.
   * @private
   */
  public render():void {
    let html = '';

    for (let i = 0, len = this._tree.length; i < len; i++) {
      const [root] = this._tree[i];

      html += root.render();
    }

    html = `<div class="root html">${html}</div>`;

    const {entries} = this._model.data;
    let text = '';

    for (let i = 0, len = entries.length; i < len; i++) {
      const entry = entries[i];

      text += `${entry.name}\n`;
      text += this.renderEntry(entries[i], 0);

      if (i < len - 1) {
        text += '\n';
      }
    }

    text = `<div class="root text"><pre class="tree">${text}</pre></div>`;

    if (this._app) {
      this._app.innerHTML = html + text;
    }
  }
}
