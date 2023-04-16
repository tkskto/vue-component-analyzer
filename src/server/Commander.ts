import {FORMAT} from './Constant';
import {program} from 'commander';

export const getOptions = (_argv: string[]): {
  dir: string,
  format: string,
  out: string,
  port: string,
  silent: boolean,
} => {
  program.option('--dir [dir]', 'root directory of src.', 'src');
  program.option('-f, --format [type]', 'Add the specified type of report [browser, json, html)]', FORMAT.BROWSER);
  program.option('-o, --out [dir]', 'output directory (enable with setting --format option to "json" or "html")', 'out');
  program.option('-p, --port [number]', 'select a port number for the local server', '8888');
  program.option('--silent', 'do not show logs with silent flag');
  program.parse(_argv);

  return program.opts();
};
