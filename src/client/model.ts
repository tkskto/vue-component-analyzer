import {CustomEventDispatcher} from './eventDispatcher';
import AnalyzeReport = vueComponentAnalyzer.AnalyzeReport;

export type VIEW_TYPE = 'GRAPH' | 'TEXT';

export class Model extends CustomEventDispatcher {
  private _data: AnalyzeReport = {
    entries: [],
    count: {},
  };

  private _viewType: VIEW_TYPE = 'GRAPH';

  public static EVENT = {
    DATA_UPDATE: 'dataUpdate',
    VIEW_CHANGED: 'viewChanged',
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

  get viewType(): VIEW_TYPE {
    return this._viewType;
  }

  set viewType(value: VIEW_TYPE) {
    this._viewType = value;
    this.dispatchEvent(Model.EVENT.VIEW_CHANGED);
  }
}
