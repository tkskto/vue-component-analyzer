// for execute from npm scripts or commandline.

import AnalyzeReport = vueComponentAnalyzer.AnalyzeReport;
import {Request, Response} from 'express';
import WebSocket from 'ws';
const path = require('path');
const http = require('http');
const {renderFile} = require('ejs');
const express = require('express');
const webSocket = require('ws');
const opener = require('opener');

const projectRoot = path.resolve(__dirname, '..');

/**
 * start web socket server and connect when finished generate component tree.
 */
const startServer = (port: number, json: AnalyzeReport): void => {
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
  const wss = new webSocket.Server({
    server,
  });

  app.use('/', (req: Request, res: Response) => {
    res.render('viewer', {
      mode: 'server',
      title: 'analyze report',
      enableWebSocket: true,
    });
  });

  server.on('error', (err: Error) => {
    console.log(err);

    server.close((serverErr: Error) => {
      console.log(serverErr);
    });

    wss.close((webSocketErr: Error) => {
      console.log(webSocketErr);
    });
  });

  server.listen(port, HOST, () => {
    const addressPort = server.address().port || port;
    const url = `http://${HOST}:${addressPort}/`;

    console.log(`Vue Component Analyzer is started at ${url}`);
    console.log('Use \'Ctrl+C\' to close it');

    opener(url);

    wss.on('connection', (ws: WebSocket) => {
      // pass tree data to browser.
      wss.clients.forEach((client: WebSocket) => {
        client.send(JSON.stringify(json));
      });

      ws.addEventListener('error', () => {
        console.error('Something went to wrong on web socket.');
      });
    });
  });
};

exports.startServer = startServer;
