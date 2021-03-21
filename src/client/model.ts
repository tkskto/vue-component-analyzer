import {CustomEventDispatcher} from './eventDispatcher';
import AnalyzeReport = vueComponentAnalyzer.AnalyzeReport;

export type INFORMATION_TYPE = 'settings' | 'props' | 'fileSize' | 'lastUpdated' | 'referenceCount';
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
    SETTING_CHANGED: 'settingChanged',
  }

  private _today: Date;

  private _todayTime: number;

  private _visibleSettings = false;

  private _visibleProps = true;

  private _visibleFileSize = true;

  private _visibleLastUpdated = true;

  private _visibleReferenceCount = true;

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

  get visibleSettings(): boolean {
    return this._visibleSettings;
  }

  set visibleSettings(value: boolean) {
    this._visibleSettings = value;
    this.dispatchEvent(Model.EVENT.SETTING_CHANGED);
  }

  get visibleProps(): boolean {
    return this._visibleProps;
  }

  set visibleProps(value: boolean) {
    this._visibleProps = value;
    this.dispatchEvent(Model.EVENT.SETTING_CHANGED);
  }

  get visibleFileSize(): boolean {
    return this._visibleFileSize;
  }

  set visibleFileSize(value: boolean) {
    this._visibleFileSize = value;
    this.dispatchEvent(Model.EVENT.SETTING_CHANGED);
  }

  get visibleLastUpdated(): boolean {
    return this._visibleLastUpdated;
  }

  set visibleLastUpdated(value: boolean) {
    this._visibleLastUpdated = value;
    this.dispatchEvent(Model.EVENT.SETTING_CHANGED);
  }

  get visibleReferenceCount(): boolean {
    return this._visibleReferenceCount;
  }

  set visibleReferenceCount(value: boolean) {
    this._visibleReferenceCount = value;
    this.dispatchEvent(Model.EVENT.SETTING_CHANGED);
  }
}
