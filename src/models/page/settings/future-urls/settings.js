import { createEvent, createStore, createEffect } from 'effector';
import { userAPI } from 'api/user';

export let changeAllSettingsFutureURLs = createEvent();
export let changeParameterFutureURLs = createEvent();

let changeParameterProcessing = createEffect();

export const $settingsFutureURLs = createStore({});

$settingsFutureURLs
  .on(changeParameterFutureURLs, (settings, { name, value }) => {
    return { ...settings, [name]: value };
  })
  .on(changeAllSettingsFutureURLs, (_, settings) => settings);

changeParameterFutureURLs.watch(changeParameterProcessing);

changeParameterProcessing.use(userAPI.changeParameterFutureURLs);
