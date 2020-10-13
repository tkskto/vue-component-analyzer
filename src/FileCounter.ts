class FileCounter {
  private _count: {[key: string]: number} = {};

  public add(filename: string): void {
    if (Object.prototype.hasOwnProperty.call(this._count, filename)) {
      this._count[filename]++;
    } else {
      this._count[filename] = 1;
    }
  }

  public get count(): {[key: string]: number} {
    return this._count;
  }
}

module.exports = FileCounter;
