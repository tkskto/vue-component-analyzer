import {FORMAT} from './Constant';

class Model {
  private _resourceRoot = '.';

  private _format = FORMAT.BROWSER;

  private _outDirectory = 'out';

  private _port = '8888';

  private _isSilentMode = true;

  private _tsconfigPathMapping = new Map<string, string>();

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

  get tsconfigPathMapping(): Map<string, string> {
    return this._tsconfigPathMapping;
  }

  set tsconfigPathMapping(paths: Map<string, string>) {
    this._tsconfigPathMapping = paths;
  }
}

export const model = new Model();
