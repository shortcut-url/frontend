import { createStore, createEvent, createEffect } from 'effector';

import { $session } from 'models/session';
import { createFetching } from 'lib/request/fetching';
import { userAPI } from 'api/user';
import Router from 'next/router';

export let usernameFieldChange = createEvent();

export let $usernameField = createStore('');
export let $usernameFieldError = $usernameField.map((usernameField) => {
  let originalUserName = $session.getState()?.user?.name;

  return originalUserName === usernameField ? true : false;
});

$usernameField.on(usernameFieldChange, (_, event) => event.target.value);

/*
 * Processing
 */

export let deleteAccountProcessing = createEffect();
export let deleteAccountFetching = createFetching(deleteAccountProcessing);

export let $isFormLoading = deleteAccountFetching.isLoading;

deleteAccountProcessing.use(userAPI.deleteAccount);

deleteAccountProcessing.done.watch(() => {
  let nowDate = new Date();

  nowDate.setDate(nowDate.getDate() + 10);

  window.alert(`
    Your account has been deleted.
    You can email us before ${nowDate.toLocaleDateString()} to restore it, 
    therwise it will be deleted forever.
  `);

  Router.push('/');
});
