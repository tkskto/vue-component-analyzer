/*!
  @tkskto/vue-component-analyzer v0.1.1
  https://github.com/tkskto/
  Released under the MIT License.
*/
class MyCustomEvent {
    constructor(type) {
        this.type = type;
        this.currentTarget = null;
    }
}
MyCustomEvent.COMPLETE = 'complete';
MyCustomEvent.CHANGE_PROPERTY = 'changeProperty';
class CustomEventListener {
    constructor(type, handler, priority = 0) {
        this.type = type;
        this.handler = handler;
        this.priority = priority;
    }
    equalCurrentListener(type, handler) {
        return this.type === type && this.handler === handler;
    }
}
class CustomEventDispatcher {
    constructor() {
        this.listeners = {};
    }
    dispatchEvent(event) {
        let e;
        let type;
        if (event instanceof MyCustomEvent) {
            type = event.type;
            e = event;
        }
        else {
            type = event;
            e = new MyCustomEvent(type);
        }
        if (this.listeners[type] !== null) {
            const len = this.listeners[type].length;
            e.currentTarget = this;
            for (let i = 0; i < len; i++) {
                const listener = this.listeners[type][i];
                try {
                    listener.handler(e);
                }
                catch (error) {
                    if (window.console) {
                        console.error(error.stack);
                    }
                }
            }
        }
        else {
            console.warn('implement "addEventListener" before dispatch');
        }
    }
    addEventListener(type, callback, priority = 0) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(new CustomEventListener(type, callback, priority));
        this.listeners[type].sort((listener1, listener2) => listener2.priority - listener1.priority);
    }
    removeEventListener(type, callback) {
        if (this.hasEventListener(type, callback)) {
            for (let i = 0; i < this.listeners[type].length; i++) {
                const listener = this.listeners[type][i];
                if (listener.equalCurrentListener(type, callback)) {
                    this.listeners[type].splice(i, 1);
                    return;
                }
            }
        }
    }
    clearEventListener() {
        this.listeners = {};
    }
    containEventListener(type) {
        if (!this.listeners[type]) {
            return false;
        }
        return this.listeners[type].length > 0;
    }
    hasEventListener(type, callback) {
        if (!this.listeners[type]) {
            return false;
        }
        for (let i = 0; i < this.listeners[type].length; i++) {
            const listener = this.listeners[type][i];
            if (listener.equalCurrentListener(type, callback)) {
                return true;
            }
        }
        return false;
    }
}

class Model extends CustomEventDispatcher {
    constructor() {
        super(...arguments);
        this._data = {
            entries: [],
            counter: {},
        };
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
        this.dispatchEvent(Model.EVENT.DATA_UPDATE);
    }
}
Model.EVENT = {
    DATA_UPDATE: 'dataUpdate',
};

class Seed {
    constructor(file, level, index) {
        this.level = level;
        this.index = index;
        this._children = [];
        this._duplicate = false;
        this._name = file.name;
        this._props = file.props;
        this._level = level;
        this._index = index;
    }
    renderChildren() {
        let html = '';
        for (let i = 0, len = this._children.length; i < len; i++) {
            html += this._children[i].render();
        }
        return `<div class="group">
        ${html}
    </div>`;
    }
    renderWithProps() {
        return `<details><summary>${this._name}</summary><pre>${JSON.stringify(this._props, null, '\t')}</pre></details>`;
    }
    render() {
        const contents = this._props ? this.renderWithProps() : this._name;
        let childHTML = '';
        let seedClassName = '';
        let fileClassName = '';
        if (this._children.length > 0) {
            childHTML = this.renderChildren();
        }
        else {
            seedClassName = ' -no-child';
        }
        if (this._duplicate) {
            fileClassName = ' -duplicate';
        }
        return `<div class="seed${seedClassName}">
      <span class="file"><span class="filename${fileClassName}">${contents}</span></span>
      ${childHTML}
    </div>`;
    }
    get children() {
        return this._children;
    }
    set children(value) {
        this._children = value;
    }
    get duplicate() {
        return this._duplicate;
    }
    set duplicate(value) {
        this._duplicate = value;
    }
}

class Renderer {
    constructor(_model) {
        this._model = _model;
        this._tree = [];
        this.ready = () => {
            const { data } = this._model;
            const { entries, counter } = data;
            console.log(counter);
            for (let i = 0, len = entries.length; i < len; i++) {
                const entry = entries[i];
                if (data) {
                    const root = new Seed(entry, 0, 0);
                    this._tree.push(this.generateSeed(entry, root, 0));
                }
            }
            this.render();
        };
        this._app = document.getElementById('app');
        _model.addEventListener(Model.EVENT.DATA_UPDATE, this.ready);
    }
    generateSeed(data, seed, level) {
        const tree = [];
        const { children } = data;
        const childSeeds = [];
        for (let i = 0, len = children.length; i < len; i++) {
            const child = children[i];
            const childSeed = new Seed(child, level + 1, i);
            childSeeds.push(childSeed);
            this.generateSeed(child, childSeed, level + 1);
        }
        seed.children = childSeeds;
        tree.push(seed);
        return tree;
    }
    render() {
        let html = '';
        for (let i = 0, len = this._tree.length; i < len; i++) {
            const [root] = this._tree[i];
            html += root.render();
        }
        const group = `<div class="root">
        ${html}
    </div>`;
        if (this._app) {
            this._app.innerHTML = group;
        }
    }
}

const model = new Model();
const renderer = new Renderer(model);
let ws;
try {
    if (window.enableWebSocket) {
        ws = new WebSocket(`ws://${location.host}`);
    }
}
catch (err) {
    console.warn('Couldn\'t connect to analyzer websocket server so you\'ll have to reload page manually to see updates in the treemap');
}
window.addEventListener('load', () => {
    if (ws) {
        ws.addEventListener('message', (event) => {
            const msg = JSON.parse(event.data);
            model.data = msg;
        });
    }
    else {
        console.warn('Couldn\'t connect to analyzer websocket server so you\'ll have to reload page manually to see updates in the treemap');
    }
});
