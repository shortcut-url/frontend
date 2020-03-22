import { requestAPI } from 'lib/request';

let createUserWithEmail = () => requestAPI('POST', 'user');

let changeParameterFutureURLs = body =>
  requestAPI('POST', 'user/settings/future-urls', { body });

export let userAPI = { createUserWithEmail, changeParameterFutureURLs };
