import {Model, VIEW_TYPE} from './model';

export class ViewSwitcher {
  constructor(private _elm: HTMLElement, private _type: VIEW_TYPE, private _model: Model) {
    _elm.addEventListener('change', this.onChange.bind(this));
  }

  private onChange() {
    this._model.viewType = this._type;
  }
}
