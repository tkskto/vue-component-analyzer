import {AnalyzeReport} from '../../types';
import {Renderer} from '../client/renderer';
import {Model} from '../client/model';
import mkdirp from 'mkdirp';
import path from 'path';
import {writeFileSync} from 'fs';
import {render} from 'ejs';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

export async function writeFileExtra(_filename: string, data: string) {
  const filename = _filename.endsWith('.json') ? _filename : `${_filename}/result.json`;

  try {
    await mkdirp(path.dirname(filename));

    writeFileSync(filename, data);
    console.log(`output completed ${filename}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export async function writeHTML(_filename: string, result: AnalyzeReport) {
  const filename = _filename.endsWith('.html') ? _filename : `${_filename}/result.html`;

  try {
    await mkdirp(path.dirname(filename));

    const clientModel = new Model();

    clientModel.data = result;

    const renderer = new Renderer(clientModel);
    const htmlString = renderer.render();
    const html = render('<%- include("/views/static.ejs", {html: html}); %>', {html: htmlString}, {root: `${projectRoot}`});

    writeFileSync(filename, html);
    console.log(`output completed ${filename}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
