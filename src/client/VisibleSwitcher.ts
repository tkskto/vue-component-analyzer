import {Model, INFORMATION_TYPE} from './model';

export class VisibleSwitcher {
  private _type: INFORMATION_TYPE;

  constructor(private _elm: HTMLInputElement, private _model: Model) {
    this._type = _elm.dataset.settingName as INFORMATION_TYPE;

    _elm.addEventListener('change', this.onChange.bind(this));
  }

  private onChange() {
    switch (this._type) {
      case 'props':
        this._model.visibleProps = this._elm.checked;
        break;
      case 'fileSize':
        this._model.visibleFileSize = this._elm.checked;
        break;
      case 'lastUpdated':
        this._model.visibleLastUpdated = this._elm.checked;
        break;
      case 'referenceCount':
        this._model.visibleReferenceCount = this._elm.checked;
        break;
      default:
        throw new Error(`not supported type: ${this._type}`);
    }
  }
}
