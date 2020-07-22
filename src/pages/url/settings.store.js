import { createStore, createEvent, createEffect } from 'effector';

import { urlAPI } from 'api/url';
import { $createdURL } from './store';

export let changeAllSettingsCreatedURL = createEvent();
export let changeParameterCreatedURL = createEvent();

let changeParameterProcessing = createEffect();

export let $settingsCreatedURL = createStore({});

$settingsCreatedURL
  .on(changeParameterCreatedURL, (settings, { name, value }) => {
    return { ...settings, [name]: value };
  })
  .on(changeAllSettingsCreatedURL, (_, settings) => settings);

changeParameterCreatedURL.watch(({ name, value }) => {
  let { url } = $createdURL.getState();

  changeParameterProcessing({ url, name, value });
});

changeParameterProcessing.use(urlAPI.changeParameterCreatedURL);
