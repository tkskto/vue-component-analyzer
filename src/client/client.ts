// for execute from browser.
import {Model} from './model';
import {Renderer} from './renderer';
import {setSettings} from './Settings';
import {setSeedOpenStateSwitcher} from './SeedOpenStateSwitcher';
import {setScreenCapture} from './ScreenCapture';

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
  setSeedOpenStateSwitcher(model);
  setSettings(model);
  setScreenCapture();

  if (ws) {
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);

      model.data = msg; // emit Model.EVENT.DATA_UPDATE event
    });
  } else {
    fetch('./tmp.json').then((res) => res.json()).then((json) => {
      console.log(json);
      model.data = json;
    }).catch((err) => {
      console.log(err.message);
    });
    console.warn('Couldn\'t connect to analyzer websocket server so you\'ll have to reload page manually to see updates in the treemap');
  }
});
