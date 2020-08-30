import {CustomEventDispatcher} from './eventDispatcher';
import Report = vueComponentAnalyzer.Report;

export class Model extends CustomEventDispatcher {
  private _data: Report = {
    name: '',
    children: []
  };

  public static EVENT = {
    DATA_UPDATE: 'dataUpdate'
  }

  constructor() {
    super();
  }

  get data(): vueComponentAnalyzer.Report {
    return this._data;
  }

  set data(value: vueComponentAnalyzer.Report) {
    this._data = value;
    this.dispatchEvent(Model.EVENT.DATA_UPDATE);
  }
}
