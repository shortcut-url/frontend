import {
  createStore,
  createEvent,
  createEffect,
  createStoreObject
} from 'effector';
import Router from 'next/router';

import { trimEvent } from 'lib/utils';
import { createFetching } from 'lib/request';
import { sessionAPI } from 'api/session';

/*
 * Email
 */
export let emailFieldChange = createEvent();

export let $emailField = createStore('');

$emailField.on(emailFieldChange.map(trimEvent), (_, newEmail) => newEmail);

/*
 * Password
 */
export let passwordFieldChange = createEvent();

export let $passwordField = createStore('');

$passwordField.on(
  passwordFieldChange.map(trimEvent),
  (_, newPassword) => newPassword
);

/*
 * Form
 */
export let formSubmitted = createEvent();

export let loginProcessing = createEffect();
export let loginFetching = createFetching(loginProcessing);

export let $form = createStoreObject({
  email: $emailField,
  password: $passwordField
});

formSubmitted.watch(() => {
  let form = $form.getState();

  loginProcessing(form);
});

loginProcessing.use(sessionAPI.create);

loginProcessing.done.watch(({ result }) => {
  if (!result.ok) return;

  Router.push('/');
});
