// for execute from browser.
import {Model} from './model';
import {Renderer} from './renderer';
import {setSettings} from './Settings';
import {setSeedOpenStateSwitcher} from './SeedOpenStateSwitcher';

const model = new Model();
new Renderer(model);
let ws: WebSocket;

try {
  if (window.enableWebSocket) {
    ws = new WebSocket(`ws://${location.host}`);
  }
} catch (err) {
  console.warn('Couldn\'t connect to analyzer websocket server so you\'ll have to reload page manually to see updates in the treemap');
}

window.addEventListener('load', () => {
  if (ws) {
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);

      setSeedOpenStateSwitcher(model);

      model.data = msg; // emit Model.EVENT.DATA_UPDATE event

      setSettings(model);
    });
  } else {
    console.warn('Couldn\'t connect to analyzer websocket server so you\'ll have to reload page manually to see updates in the treemap');
  }
});
