import { createStore, combine, createEvent, createEffect } from 'effector';
import Router from 'next/router';

import { urlAPI } from 'api/url';
import {
  changeAllSettingsCreatedURL,
  $settingsCreatedURL
} from './settings.store';

export let addCreatedURLData = createEvent();

export let $createdURLData = createStore({});

$createdURLData.on(addCreatedURLData, (_, { settings, ...createdURL }) => {
  changeAllSettingsCreatedURL(settings);

  return createdURL;
});

/*
 * Delete Created URL
 */

export let deleteCreatedURL = createEffect();

deleteCreatedURL.use(() => {
  let { url } = $createdURLData.getState();

  let userConfirm = window.confirm(
    `Are you sure you want to delete URL: ${url} ?`
  );

  if (!userConfirm) return;

  return urlAPI.deleteCreatedURL({ url });
});

deleteCreatedURL.finally.watch(({ result }) => {
  if (!result?.ok) return;

  Router.push('/profile');
});

export let $createdURL = combine(
  $createdURLData,
  $settingsCreatedURL,
  (data, settings) => {
    return { ...data, settings };
  }
);
