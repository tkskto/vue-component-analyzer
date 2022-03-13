class StyleGetter {
  private _style = '';

  private getStyle = () => fetch('/dist/style.css').then((res) => res.text());

  /**
   * get css strings for SVG Image
   */
  public getCurrentStyleText = async (): Promise<string> => {
    if (this._style) {
      return this._style;
    }

    const raw = await this.getStyle();

    this._style = raw.replace('@charset "UTF-8";', '').trim();

    return this._style;
  };
}

export const styleGetter = new StyleGetter();
