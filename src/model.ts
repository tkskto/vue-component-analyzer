import {CustomEventDispatcher} from './eventDispatcher';
import AnalyzeReport = vueComponentAnalyzer.AnalyzeReport;

export class Model extends CustomEventDispatcher {
  private _data: AnalyzeReport = {
    entries: [],
  };

  public static EVENT = {
    DATA_UPDATE: 'dataUpdate',
  }

  get data(): vueComponentAnalyzer.AnalyzeReport {
    return this._data;
  }

  set data(value: vueComponentAnalyzer.AnalyzeReport) {
    this._data = value;
    this.dispatchEvent(Model.EVENT.DATA_UPDATE);
  }
}
