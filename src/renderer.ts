import {Seed} from './Seed';
import {Model} from './model';
import Report = vueComponentAnalyzer.Report;

export class Renderer {
  private readonly _app: HTMLElement | null;

  private _tree: Seed[] = [];

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
  private generateSeed(data: Report, seed: Seed, level: number): Seed[] {
    const tree: Seed[] = [];
    const {children} = data;
    const childSeeds: Seed[] = [];

    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];
      const childSeed = new Seed(child.name, level + 1, i);

      childSeeds.push(childSeed);

      this.generateSeed(child, childSeed, level + 1);
    }

    seed.children = childSeeds;
    tree.push(seed);

    return tree;
  }

  private ready = () => {
    const {data} = this._model;

    // TODO: multi entry?

    const root = new Seed(data.name, 0, 0);

    this._tree = this.generateSeed(data, root, 0);

    this.render();
  }

  /**
   * rendering DOM from tree.
   * @private
   */
  private render():void {
    const [root] = this._tree;

    const group = `<div class="root">
        ${root.render()}
    </div>`;

    if (this._app) {
      this._app.innerHTML = group;
    }
  }
}
