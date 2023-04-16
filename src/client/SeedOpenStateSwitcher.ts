class SeedOpenStateSwitcher {
  private _isOpen = false;

  private _details: NodeListOf<HTMLDetailsElement> | null = null;

  private _textElement: HTMLElement | null;

  constructor(_button: HTMLButtonElement) {
    this._textElement = document.getElementById('btn-toggle-visible-state-text');
    this._details = document.querySelectorAll<HTMLDetailsElement>('.detail');

    _button.addEventListener('click', this.onClick.bind(this));
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
}

export const setSeedOpenStateSwitcher = (): void => {
  const btn = document.getElementById('btn-toggle-visible-state');

  if (btn) {
    new SeedOpenStateSwitcher(btn as HTMLButtonElement);
  }
};
