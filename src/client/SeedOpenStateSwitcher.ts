import {Model} from './model';

class SeedOpenStateSwitcher {
  private _isOpen = false;

  private _details: NodeListOf<HTMLDetailsElement> | null = null;

  private _textElement: HTMLElement | null;

  constructor(_button: HTMLButtonElement, model: Model) {
    this._textElement = document.getElementById('btn-toggle-visible-state-text');
    _button.addEventListener('click', this.onClick.bind(this));

    model.addEventListener(Model.EVENT.DATA_UPDATE, this.onDataUpdated.bind(this));
  }

  private open() {
    if (this._details) {
      this._details.forEach((detail) => {
        detail.open = true;
      });
    }

    if (this._textElement) {
      this._textElement.textContent = 'collapse all';
    }
  }

  private close() {
    if (this._details) {
      this._details.forEach((detail) => {
        detail.open = false;
      });
    }

    if (this._textElement) {
      this._textElement.textContent = 'expand all';
    }
  }

  private onClick() {
    this._isOpen = !this._isOpen;

    if (this._isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  private onDataUpdated() {
    this._details = document.querySelectorAll<HTMLDetailsElement>('.detail');
  }
}

export const setSeedOpenStateSwitcher = (model: Model): void => {
  const btn = document.getElementById('btn-toggle-visible-state');

  if (btn) {
    new SeedOpenStateSwitcher(btn as HTMLButtonElement, model);
  }
};
