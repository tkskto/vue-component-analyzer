/*!
  @tkskto/vue-component-analyzer v0.0.5
  https://github.com/tkskto/
  Released under the MIT License.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const express_1 = tslib_1.__importDefault(require("express"));
const ws_1 = tslib_1.__importDefault(require("ws"));
const http_1 = tslib_1.__importDefault(require("http"));
const opener = require('opener');
const projectRoot = path_1.default.resolve(__dirname, '..');
exports.startServer = (json) => {
    const HOST = '127.0.0.1';
    const PORT = 8888;
    const app = express_1.default();
    app.engine('ejs', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    app.set('views', `${projectRoot}/views`);
    app.use(express_1.default.static(`${projectRoot}/`));
    const server = http_1.default.createServer(app);
    const wss = new ws_1.default.Server({
        server,
    });
    app.use('/', (req, res) => {
        res.render('viewer', {
            mode: 'server',
            title: 'analyze report',
            enableWebSocket: true,
        });
    });
    server.listen(PORT, HOST, () => {
        const addressPort = server.address().port || PORT;
        const url = `http://${HOST}:${addressPort}/`;
        console.log(`Vue Component Analyzer is started at ${url}`);
        console.log('Use \'Ctrl+C\' to close it');
        opener(url);
        wss.on('connection', (ws) => {
            wss.clients.forEach((client) => {
                client.send(JSON.stringify(json));
            });
            ws.on('error', (err) => {
                console.error(err);
            });
        });
    });
};
