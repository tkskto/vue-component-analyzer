import {capture} from '../ScreenCapture';
import {disableTabIndex, resetTabIndex} from '../common';

class CustomDialog {
  private _contents: HTMLElement | null;

  private _btnClose: HTMLButtonElement;

  private _btnExport: HTMLAnchorElement;

  constructor() {
    this._contents = document.getElementById('dialog-contents');
    this._btnClose = document.getElementById('btn-dialog-close') as HTMLButtonElement;
    this._btnExport = document.getElementById('btn-export') as HTMLAnchorElement;

    if (this._btnClose) {
      this._btnClose.addEventListener('click', this.close.bind(this));
    }
  }

  show = () => {
    document.body.classList.add('-dialog-show');
    disableTabIndex('#dialog');
  }

  close = () => {
    document.body.classList.remove('-dialog-show');
    resetTabIndex();
  }

  load = () => {
    this.show();

    if (this._contents) {
      this._contents.innerHTML = '<p>now loading...</p>';
    }
  }

  complete = (html: string) => {
    if (this._contents) {
      this._contents.innerHTML = html;
    }
  }

  showExportDialog = async () => {
    this.load();
    const img = await capture();
    this._btnExport.href = img.src;
    this.complete(img.outerHTML);
  };
}

export const customDialog = new CustomDialog();
