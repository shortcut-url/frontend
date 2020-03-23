import { createEvent, createStore } from 'effector';

export let changeAllSettingsFutureURLs = createEvent();
export let changeParameterFutureURLs = createEvent();

export const $settingsFutureURLs = createStore({});

$settingsFutureURLs
  .on(changeParameterFutureURLs, (settings, { name, value }) => {
    return { ...settings, [name]: value };
  })
  .on(changeAllSettingsFutureURLs, (_, settings) => settings);
