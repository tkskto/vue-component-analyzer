class CustomDialog {
  private _contents: HTMLElement | null;

  private _btnExport: HTMLAnchorElement;

  constructor() {
    this._contents = document.getElementById('dialog-contents');
    this._btnExport = document.getElementById('btn-export') as HTMLAnchorElement;
  }

  public load() {
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
