const cwd = process.cwd();

export class FileCounter {
  private _count: {[key: string]: number} = {};

  public add(_filename: string): void {
    const shortFilename = _filename.replace(cwd, '');

    if (Object.prototype.hasOwnProperty.call(this._count, shortFilename)) {
      this._count[shortFilename]++;
    } else {
      this._count[shortFilename] = 1;
    }
  }

  public clear(): void {
    this._count = {};
  }

  public get result(): {[key: string]: number} {
    return this._count;
  }
}

export const fileCounter = new FileCounter();
