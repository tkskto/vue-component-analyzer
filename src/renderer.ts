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
   * @param level
   * @private
   */
  private generateSeed(data: FileReport, seed: Seed, level: number): Seed[] {
    const tree: Seed[] = [];
    const {children} = data;
    const childSeeds: Seed[] = [];
    const {count} = this._model.data;

    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];
      const childSeed = new Seed(child, level + 1, i, count[child.name]);

      childSeeds.push(childSeed);

      this.generateSeed(child, childSeed, level + 1);
    }

    seed.children = childSeeds;
    tree.push(seed);

    return tree;
  }

  private ready = () => {
    const {data} = this._model;
    const {entries} = data;

    for (let i = 0, len = entries.length; i < len; i++) {
      const entry = entries[i];

      if (data) {
        const root = new Seed(entry, 0, 0, 0);

        this._tree.push(this.generateSeed(entry, root, 0));
      }
    }

    this.render();
  }

  /**
   * rendering DOM from tree.
   * @private
   */
  private render():void {
    let html = '';
    for (let i = 0, len = this._tree.length; i < len; i++) {
      const [root] = this._tree[i];

      html += root.render();
    }

    const group = `<div class="root">
        ${html}
    </div>`;

    if (this._app) {
      this._app.innerHTML = group;
    }
  }
}
