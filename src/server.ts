// for execute from npm scripts or commandline.

import path from 'path';
import express from 'express';
import webSocket, {AddressInfo} from 'ws';
import http from 'http';
import AnalyzeReport = vueComponentAnalyzer.AnalyzeReport;
const opener = require('opener');

const projectRoot = path.resolve(__dirname, '..');

/**
 * start web socket server and connect when finished generate component tree.
 */
export const startServer = (port: number, json: AnalyzeReport): void => {
  const HOST = '127.0.0.1';

  // establish local web server.
  const app = express();

  // use EJS to pass variables.
  app.engine('ejs', require('ejs').renderFile);
  app.set('view engine', 'ejs');
  app.set('views', `${projectRoot}/views`);
  app.use(express.static(`${projectRoot}/`));

  // use same server for WebSocket Server.
  const server = http.createServer(app);
  const wss = new webSocket.Server({
    server,
  });

  app.use('/', (req, res) => {
    res.render('viewer', {
      mode: 'server',
      title: 'analyze report',
      enableWebSocket: true,
    });
  });

  server.listen(port, HOST, () => {
    const addressPort = (server.address() as AddressInfo).port || port;
    const url = `http://${HOST}:${addressPort}/`;

    console.log(`Vue Component Analyzer is started at ${url}`);
    console.log('Use \'Ctrl+C\' to close it');

    opener(url);

    wss.on('connection', (ws) => {
      // pass tree data to browser.
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(json));
      });

      ws.on('error', (err) => {
        console.error(err);
      });
    });
  });
};
