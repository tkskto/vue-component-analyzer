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
        super();
        this._data = {
            entries: [],
            count: {},
        };
        this._viewType = 'GRAPH';
        this._visibleSettings = false;
        this._visibleProps = true;
        this._visibleFileSize = true;
        this._visibleLastUpdated = true;
        this._visibleReferenceCount = true;
        this.getHowManyDaysAgo = (date) => {
            const time = date.getTime();
            const diff = this._todayTime - time;
            return Math.floor(diff / 86400000);
        };
        this._today = new Date();
        this._todayTime = this._today.getTime();
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
        this.dispatchEvent(Model.EVENT.DATA_UPDATE);
    }
    get viewType() {
        return this._viewType;
    }
    set viewType(value) {
        this._viewType = value;
        this.dispatchEvent(Model.EVENT.SETTING_CHANGED);
    }
    get visibleSettings() {
        return this._visibleSettings;
    }
    set visibleSettings(value) {
        this._visibleSettings = value;
        this.dispatchEvent(Model.EVENT.SETTING_CHANGED);
    }
    get visibleProps() {
        return this._visibleProps;
    }
    set visibleProps(value) {
        this._visibleProps = value;
        this.dispatchEvent(Model.EVENT.SETTING_CHANGED);
    }
    get visibleFileSize() {
        return this._visibleFileSize;
    }
    set visibleFileSize(value) {
        this._visibleFileSize = value;
        this.dispatchEvent(Model.EVENT.SETTING_CHANGED);
    }
    get visibleLastUpdated() {
        return this._visibleLastUpdated;
    }
    set visibleLastUpdated(value) {
        this._visibleLastUpdated = value;
        this.dispatchEvent(Model.EVENT.SETTING_CHANGED);
    }
    get visibleReferenceCount() {
        return this._visibleReferenceCount;
    }
    set visibleReferenceCount(value) {
        this._visibleReferenceCount = value;
        this.dispatchEvent(Model.EVENT.SETTING_CHANGED);
    }
}
Model.EVENT = {
    DATA_UPDATE: 'dataUpdate',
    SETTING_CHANGED: 'settingChanged',
};

class Seed {
    constructor(file, count, _model) {
        this._model = _model;
        this._children = [];
        this._name = file.name;
        this._props = file.props;
        this._fileSize = file.size;
        this._lastModifiedTime = file.lastModifiedTime;
        this._count = count;
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
    renderProps() {
        return this._props ? `<pre class="file__props">props: ${JSON.stringify(this._props, null, '\t')}</pre>` : '';
    }
    renderMetaData() {
        let metaString = '';
        const fileSize = (this._fileSize / 1024).toFixed(2);
        const lastUpdated = this._lastModifiedTime === 0 ? 0 : this._model.getHowManyDaysAgo(new Date(this._lastModifiedTime));
        if (fileSize) {
            metaString += `<span class="file__meta meta__fileSize">FileSize: ${fileSize} KB</span>`;
        }
        metaString += `<span class="file__meta meta__lastUpdated">LastUpdated: ${lastUpdated} days ago</span>`;
        return metaString;
    }
    renderDetails() {
        return `<details class="detail">
        <summary>${this._name}</summary>
        ${this.renderProps()}
        ${this.renderMetaData()}
    </details>`;
    }
    render() {
        const contents = this.renderDetails();
        let childHTML = '';
        let seedClassName = '';
        if (this._children.length > 0) {
            childHTML = this.renderChildren();
        }
        else {
            seedClassName = ' -no-child';
        }
        return `<div class="seed${seedClassName}">
      <div class="file">
        <div class="filename">
          <div class="file__text">${contents}</div>
          ${this.getCountText()}
        </div>
      </div>
      ${childHTML}
    </div>`;
    }
    getCountText() {
        if (this._count === 0) {
            return '';
        }
        else if (this._count === 1) {
            return '<span class="file__count">1 time referenced.</span>';
        }
        return `<span class="file__count">${this._count} times referenced.</span>`;
    }
    get children() {
        return this._children;
    }
    set children(value) {
        this._children = value;
    }
}

class Renderer {
    constructor(_model) {
        this._model = _model;
        this._tree = [];
        this.ready = () => {
            if ('GRAPH' === this._model.viewType) {
                const { data } = this._model;
                const { entries } = data;
                for (let i = 0, len = entries.length; i < len; i++) {
                    const entry = entries[i];
                    if (data) {
                        const root = new Seed(entry, 0, this._model);
                        this._tree.push(this.generateSeed(entry, root));
                    }
                }
            }
            this.render();
        };
        this._app = document.getElementById('app');
        _model.addEventListener(Model.EVENT.DATA_UPDATE, this.ready);
    }
    generateSeed(data, seed) {
        const tree = [];
        const { children } = data;
        const childSeeds = [];
        const { count } = this._model.data;
        for (let i = 0, len = children.length; i < len; i++) {
            const child = children[i];
            const childSeed = new Seed(child, count[child.name], this._model);
            childSeeds.push(childSeed);
            this.generateSeed(child, childSeed);
        }
        seed.children = childSeeds;
        tree.push(seed);
        return tree;
    }
    renderLine(name, level, isLast) {
        let line = ' ';
        for (let i = 0; i < level; i++) {
            line += '│   ';
        }
        line += isLast ? '└─ ' : '├─ ';
        line += name;
        return `${line}\n`;
    }
    renderEntry(entry, level) {
        let result = '';
        for (let i = 0, len = entry.children.length; i < len; i++) {
            const child = entry.children[i];
            result += this.renderLine(child.name, level, i === (len - 1));
            result += this.renderEntry(child, level + 1);
        }
        return result;
    }
    render() {
        let html = '';
        for (let i = 0, len = this._tree.length; i < len; i++) {
            const [root] = this._tree[i];
            html += root.render();
        }
        html = `<div class="root html">${html}</div>`;
        const { entries } = this._model.data;
        let text = '';
        for (let i = 0, len = entries.length; i < len; i++) {
            const entry = entries[i];
            text += `${entry.name}\n`;
            text += this.renderEntry(entries[i], 0);
            if (i < len - 1) {
                text += '\n';
            }
        }
        text = `<div class="root text"><pre class="tree">${text}</pre></div>`;
        if (this._app) {
            this._app.innerHTML = html + text;
        }
    }
}

class VisibleSwitcher {
    constructor(_elm, _model) {
        this._elm = _elm;
        this._model = _model;
        this._type = _elm.dataset.settingName;
        _elm.addEventListener('change', this.onChange.bind(this));
    }
    onChange() {
        switch (this._type) {
            case 'props':
                this._model.visibleProps = this._elm.checked;
                break;
            case 'fileSize':
                this._model.visibleFileSize = this._elm.checked;
                break;
            case 'lastUpdated':
                this._model.visibleLastUpdated = this._elm.checked;
                break;
            case 'referenceCount':
                this._model.visibleReferenceCount = this._elm.checked;
                break;
            default:
                throw new Error(`not supported type: ${this._type}`);
        }
    }
}

class ViewSwitcher {
    constructor(_elm, _type, _model) {
        this._elm = _elm;
        this._type = _type;
        this._model = _model;
        _elm.addEventListener('change', this.onChange.bind(this));
    }
    onChange() {
        this._model.viewType = this._type;
    }
}

const setSettings = function (model) {
    const { body } = document;
    const btnSwitchSettings = document.getElementById('btn-settings');
    const nodeListOfSwitch = body.querySelectorAll('.js-settings-toggle');
    const switcherElmForGraph = document.getElementById('js-view-switch-graph');
    const switcherElmForText = document.getElementById('js-view-switch-text');
    new ViewSwitcher(switcherElmForGraph, 'GRAPH', model);
    new ViewSwitcher(switcherElmForText, 'TEXT', model);
    const onSettingsChanged = function () {
        body.className = `${model.viewType}`;
        if (model.visibleSettings) {
            body.classList.add('show-settings');
        }
        if (!model.visibleProps) {
            body.classList.add('no-props');
        }
        if (!model.visibleFileSize) {
            body.classList.add('no-fileSize');
        }
        if (!model.visibleLastUpdated) {
            body.classList.add('no-lastUpdated');
        }
        if (!model.visibleReferenceCount) {
            body.classList.add('no-referenceCount');
        }
    };
    nodeListOfSwitch.forEach((node) => {
        new VisibleSwitcher(node, model);
    });
    model.addEventListener(Model.EVENT.SETTING_CHANGED, onSettingsChanged);
    if (btnSwitchSettings) {
        btnSwitchSettings.addEventListener('click', () => {
            model.visibleSettings = !model.visibleSettings;
        });
    }
    onSettingsChanged();
};

class SeedOpenStateSwitcher {
    constructor(_button, model) {
        this._isOpen = false;
        this._details = null;
        this._textElement = document.getElementById('btn-toggle-visible-state-text');
        _button.addEventListener('click', this.onClick.bind(this));
        model.addEventListener(Model.EVENT.DATA_UPDATE, this.onDataUpdated.bind(this));
    }
    open() {
        if (this._details) {
            this._details.forEach((detail) => {
                detail.open = true;
            });
        }
        if (this._textElement) {
            this._textElement.textContent = 'collapse all';
        }
    }
    close() {
        if (this._details) {
            this._details.forEach((detail) => {
                detail.open = false;
            });
        }
        if (this._textElement) {
            this._textElement.textContent = 'expand all';
        }
    }
    onClick() {
        this._isOpen = !this._isOpen;
        if (this._isOpen) {
            this.open();
        }
        else {
            this.close();
        }
    }
    onDataUpdated() {
        this._details = document.querySelectorAll('.detail');
    }
}
const setSeedOpenStateSwitcher = (model) => {
    const btn = document.getElementById('btn-toggle-visible-state');
    if (btn) {
        new SeedOpenStateSwitcher(btn, model);
    }
};

const model = new Model();
new Renderer(model);
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
    setSeedOpenStateSwitcher(model);
    setSettings(model);
    if (ws) {
        ws.addEventListener('message', (event) => {
            const msg = JSON.parse(event.data);
            model.data = msg;
        });
    }
    else {
        fetch('./tmp.json').then((res) => res.json()).then((json) => {
            console.log(json);
            model.data = json;
        }).catch((err) => {
            console.log(err.message);
        });
        console.warn('Couldn\'t connect to analyzer websocket server so you\'ll have to reload page manually to see updates in the treemap');
    }
});
