import {Model} from './model';

class SeedOpenStateSwitcher {
  private _isOpen = false;

  private _details: NodeListOf<HTMLDetailsElement> | null = null;

  constructor(_button: HTMLButtonElement, model: Model) {
    _button.addEventListener('click', this.onClick.bind(this));

    model.addEventListener(Model.EVENT.DATA_UPDATE, this.onDataUpdated.bind(this));
  }

  private onClick() {
    if (this._details) {
      this._isOpen = !this._isOpen;
      this._details.forEach((detail) => {
        detail.open = this._isOpen;
      });
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
