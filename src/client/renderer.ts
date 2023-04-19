// for execute from browser.

import {FileReport} from '../../types';
import {Seed} from './Seed';
import {Model} from './model';

export class Renderer {
  private _model: Model;

  private _tree: Seed[][] = [];

  constructor(_model: Model) {
    this._model = _model;
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

  /**
   * transform json to Tree data for rendering
   */
  private ready = () => {
    const {data} = this._model;
    const {entries} = data;

    for (let i = 0, len = entries.length; i < len; i++) {
      const entry = entries[i];

      if (data) {
        const root = new Seed(entry, 0, this._model);

        this._tree.push(this.generateSeed(entry, root));
      }
    }
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
  public render(): string {
    let html = '';

    this.ready();

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

    return html + text;
  }
}
