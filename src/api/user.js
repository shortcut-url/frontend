import { requestAPI } from 'lib/request';

let createUserWithEmail = () => requestAPI('POST', 'user');

let changeSettingsFutureLinks = body =>
  requestAPI('POST', 'user/settings/future-links', { body });

export let userAPI = { createUserWithEmail, changeSettingsFutureLinks };
