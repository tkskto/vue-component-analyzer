import {disableTabIndex, resetTabIndex} from '../common';

class CustomDialog {
  private _body: HTMLElement;

  private _contents: HTMLElement | null;

  private _btnClose: HTMLButtonElement;

  private _btnExport: HTMLAnchorElement;

  constructor() {
    this._body = document.body;
    this._contents = document.getElementById('dialog-contents');
    this._btnClose = document.getElementById('btn-dialog-close') as HTMLButtonElement;
    this._btnExport = document.getElementById('btn-export') as HTMLAnchorElement;

    if (this._btnClose) {
      this._btnClose.addEventListener('click', this.close.bind(this));
    }
  }

  private show() {
    this._body.classList.add('-dialog-show');
    disableTabIndex('#dialog');
  }

  private close() {
    this._body.classList.remove('-dialog-show');
    resetTabIndex();
  }

  public load() {
    this.show();

    if (this._contents) {
      this._contents.innerHTML = '<p>now loading...</p>';
    }
  }

  private complete(html: string) {
    if (this._contents) {
      this._contents.innerHTML = html;
    }
  }

  showExportDialog(img: HTMLImageElement) {
    this._btnExport.href = img.src;
    this.complete(img.outerHTML);
  }
}

export const customDialog = new CustomDialog();
