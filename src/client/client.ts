// for execute from browser.
import {Model} from './model';
import {Renderer} from './renderer';
import {ViewSwitcher} from './viewSwitcher';

const model = new Model();
const renderer = new Renderer(model);
const switcherElmForGraph: HTMLInputElement = document.getElementById('js-view-switch-graph') as HTMLInputElement;
const switcherElmForText: HTMLInputElement = document.getElementById('js-view-switch-text') as HTMLInputElement;
const switcherForGraph = new ViewSwitcher(switcherElmForGraph, 'GRAPH', model); // eslint-disable-line
const switcherForText = new ViewSwitcher(switcherElmForText, 'TEXT', model); // eslint-disable-line
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

      model.data = msg; // emit Model.EVENT.DATA_UPDATE event
    });
  } else {
    console.warn('Couldn\'t connect to analyzer websocket server so you\'ll have to reload page manually to see updates in the treemap');
  }
});

model.addEventListener(Model.EVENT.VIEW_CHANGED, () => renderer.render());

