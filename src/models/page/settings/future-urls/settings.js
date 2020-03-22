import { createEvent, createStore } from 'effector';

export let changeParameterFutureURLs = createEvent();

export const $settingsFutureURLs = createStore({ statistics: true });

$settingsFutureURLs.on(
  changeParameterFutureURLs,
  (settings, { name, value }) => {
    return { ...settings, [name]: value };
  }
);
