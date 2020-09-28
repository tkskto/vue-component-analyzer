// // for execute from cli
import {Model} from './model';
import {Renderer} from './renderer';

const model = new Model();
const renderer = new Renderer(model);
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

      model.data = msg.data; // emit Model.EVENT.DATA_UPDATE event
    });
  }

  // } else {
  //   const mock = {
  //     "name": "file1.vue",
  //     "children": [
  //       {
  //         "name": "file1-1.vue",
  //         "children": [
  //           {
  //             "name": "file1-1-1.vue",
  //             "children": []
  //           },{
  //             "name": "file1-1-2.vue",
  //             "children": []
  //           },{
  //             "name": "file1-1-3.vue",
  //             "children": []
  //           },{
  //             "name": "file1-1-4.vue",
  //             "children": []
  //           },
  //         ]
  //       },
  //       {
  //         "name": "file1-2.vue",
  //         "children": [
  //           {
  //             "name": "file1-2-1.vue",
  //             "children": []
  //           },{
  //             "name": "file1-2-2.vue",
  //             "children": []
  //           }
  //         ]
  //       }
  //     ]
  //   };
  //
  //   model.data = mock;
  // }
}, false);


