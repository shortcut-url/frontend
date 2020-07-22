import {
  createStore,
  createEvent,
  createEffect,
  createStoreObject
} from 'effector';

import { trimEvent } from 'lib/utils/trim';
import { createFetching } from 'lib/request/fetching';
import { userAPI } from 'api/user';
import { loginProcessing } from 'pages/login/email/store';

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
 * Username
 */
export let usernameFieldChange = createEvent();

export let $usernameField = createStore('');

$usernameField.on(
  usernameFieldChange.map(trimEvent),
  (_, newUsername) => newUsername
);

/*
 * Form
 */
export let formSubmitted = createEvent();

export let registerProcessing = createEffect();
export let registerFetching = createFetching(registerProcessing);

export let $form = createStoreObject({
  email: $emailField,
  password: $passwordField,
  name: $usernameField
});

formSubmitted.watch(() => {
  let form = $form.getState();

  registerProcessing(form);
});

registerProcessing.use(userAPI.createUserWithEmail);

registerProcessing.done.watch(({ result }) => {
  if (!result.ok) return;

  loginProcessing({
    email: $emailField.getState(),
    password: $passwordField.getState()
  });
});
