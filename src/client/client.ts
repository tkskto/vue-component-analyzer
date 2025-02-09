// for execute from browser.
import {Model} from './model';
import {Renderer} from './renderer';
import {setSettings} from './Settings';
import {setSeedOpenStateSwitcher} from './SeedOpenStateSwitcher';
import {setScreenCapture} from './ScreenCapture';

const model = new Model();
const renderer = new Renderer(model);
let ws: WebSocket;

try {
  if (window.enableWebSocket) {
    ws = new WebSocket(`ws://${location.host}`);
  }
} catch (err) {
  console.warn('Couldn\'t connect to analyzer websocket server so you\'ll have to reload page manually to see updates in the treemap');

  if (err instanceof Error) {
    console.warn(err.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (ws) {
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      const app = document.querySelector<HTMLElement>('#app');

      if (!app) {
        return;
      }

      model.data = msg;

      const html = renderer.render();

      app.innerHTML = html;

      setSettings(model);
      setScreenCapture();
      setSeedOpenStateSwitcher();
    });
  } else {
    console.warn('Couldn\'t connect to analyzer websocket server so you\'ll have to reload page manually to see updates in the treemap');
  }
});
