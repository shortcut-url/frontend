import { createEvent, createStore } from 'effector';

export let changeSettingsFutureLink = createEvent();

export const $settingsFutureLinks = createStore({ statistics: true });

$settingsFutureLinks.on(
  changeSettingsFutureLink,
  (settings, { name, value }) => {
    return { ...settings, [name]: value };
  }
);
