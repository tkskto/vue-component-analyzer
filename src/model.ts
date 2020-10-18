import {CustomEventDispatcher} from './eventDispatcher';
import AnalyzeReport = vueComponentAnalyzer.AnalyzeReport;

export class Model extends CustomEventDispatcher {
  private _data: AnalyzeReport = {
    entries: [],
    count: {},
  };

  public static EVENT = {
    DATA_UPDATE: 'dataUpdate',
  }

  private _today: Date;

  private _todayTime: number;

  constructor() {
    super();

    this._today = new Date();
    this._todayTime = this._today.getTime();
  }

  get data(): vueComponentAnalyzer.AnalyzeReport {
    return this._data;
  }

  set data(value: vueComponentAnalyzer.AnalyzeReport) {
    this._data = value;
    this.dispatchEvent(Model.EVENT.DATA_UPDATE);
  }

  /**
   * get How many Days ago from today.
   * @param date
   */
  public getHowManyDaysAgo = (date: Date): number => {
    const time = date.getTime();
    const diff = this._todayTime - time;

    return Math.floor(diff / 86400000);
  };
}
