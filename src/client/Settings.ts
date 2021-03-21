import {Model} from './model';
import {VisibleSwitcher} from './VisibleSwitcher';
import {ViewSwitcher} from './viewSwitcher';

export const setSettings = function (model: Model) {
  const {body} = document;
  const btnSwitchSettings = document.getElementById('btn-settings');
  const nodeListOfSwitch = body.querySelectorAll<HTMLInputElement>('.js-settings-toggle');
  const switcherElmForGraph: HTMLInputElement = document.getElementById('js-view-switch-graph') as HTMLInputElement;
  const switcherElmForText: HTMLInputElement = document.getElementById('js-view-switch-text') as HTMLInputElement;
  const switcherForGraph = new ViewSwitcher(switcherElmForGraph, 'GRAPH', model); // eslint-disable-line
  const switcherForText = new ViewSwitcher(switcherElmForText, 'TEXT', model); // eslint-disable-line

  const onSettingsChanged = function () {
    body.className = '';

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
