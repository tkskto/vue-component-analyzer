// for execute from npm scripts or commandline.

import AnalyzeReport = vueComponentAnalyzer.AnalyzeReport;
import express from 'express';
import {WebSocketServer} from 'ws';
import path from 'path';
import http from 'http';
import {renderFile} from 'ejs';
import opener from 'opener';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * start web socket server and connect when finished generate component tree.
 */
export const startServer = (port: string, json: AnalyzeReport): void => {
  const HOST = '127.0.0.1';

  // establish local web server.
  const app = express();

  // use EJS to pass variables.
  app.engine('ejs', renderFile);
  app.set('view engine', 'ejs');
  app.set('views', `${projectRoot}/views`);
  app.use(express.static(`${projectRoot}/`));

  // use same server for WebSocket Server.
  const server = http.createServer(app);
  const wss = new WebSocketServer({
    server,
  });

  app.use('/', (req: express.Request, res: express.Response) => {
    res.render('viewer', {
      mode: 'server',
      title: 'analyze report',
      enableWebSocket: true,
    });
  });

  server.on('error', (err: Error) => {
    console.log(err);

    if (server.listening) {
      server.close((serverErr: Error | undefined) => {
        console.log(serverErr);
      });
    }
  });

  server.listen(Number(port), HOST, () => {
    const address = server?.address();
    let addressPort = port;

    if (typeof address === 'string') {
      addressPort = address;
    } else if (typeof address === 'object') {
      addressPort = String(address?.port) || port;
    }

    const url = `http://${HOST}:${addressPort}/`;

    console.log(`Vue Component Analyzer is started at ${url}`);
    console.log('Use \'Ctrl+C\' to close it');

    opener(url);

    wss.on('connection', (ws: WebSocket) => {
      // pass tree data to browser.
      ws.send(JSON.stringify(json));

      ws.addEventListener('error', () => {
        console.error('Something went to wrong on web socket.');
      });
    });
  });
};
