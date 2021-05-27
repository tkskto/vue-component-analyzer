import {FORMAT} from './Constant';

class Model {
  private _resourceRoot = 'src';

  private _format = FORMAT.BROWSER;

  private _outDirectory = 'out';

  private _port = '8888';

  private _isSilentMode = false;

  get resourceRoot(): string {
    return this._resourceRoot;
  }

  set resourceRoot(value: string) {
    this._resourceRoot = value;
  }

  get format(): string {
    return this._format;
  }

  set format(value: string) {
    this._format = value;
  }

  get outDirectory(): string {
    return this._outDirectory;
  }

  set outDirectory(value: string) {
    this._outDirectory = value;
  }

  get port(): string {
    return this._port;
  }

  set port(value: string) {
    this._port = value;
  }

  get isSilentMode(): boolean {
    return this._isSilentMode;
  }

  set isSilentMode(value: boolean) {
    this._isSilentMode = value;
  }
}

export const model = new Model();
