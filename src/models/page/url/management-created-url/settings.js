import { createStore, createEvent, createEffect } from 'effector';

import { urlAPI } from 'api/url';

export let changeAllSettingsCreatedURL = createEvent();
export let changeParameterCreatedURL = createEvent();

let changeParameterProcessing = createEffect();

export let $settingsCreatedURL = createStore({});

$settingsCreatedURL
  .on(changeParameterCreatedURL, (settings, { name, value }) => {
    return { ...settings, [name]: value };
  })
  .on(changeAllSettingsCreatedURL, (_, settings) => settings);

changeParameterCreatedURL.watch(changeParameterProcessing);

changeParameterProcessing.use(urlAPI.changeParameterCreatedURL);
