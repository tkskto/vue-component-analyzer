import path from 'path';
import express from 'express';
import webSocket from 'ws';
import http from 'http';
const projectRoot = path.resolve(__dirname, '..');

// TODO: open tree viewer

/**
 * start web socket server and connect when finished generate component tree.
 */
export const startServer = function (): {ws: webSocket.Server, http: http.Server} {
  const app = express();

  app.set('views', `${projectRoot}/views`);
  app.use(express.static(`${projectRoot}/dist`));
  app.use('/', (req, res) => {
    res.render('viewer', {
      mode: 'server',
      title: 'title', // TODO: import project's package.json
      enableWebSocket: true,
    });
  });

  const server = http.createServer(app);
  const wss = new webSocket.Server({
    server,
  });

  wss.on('connection', (ws) => {
    ws.on('error', (err) => {
      console.error(err);
      // TODO: handling err
    });
  });

  return {
    ws: wss,
    http: server,
  };
};
