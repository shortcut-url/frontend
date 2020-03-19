import { requestAPI } from 'lib/request';

let create = () => requestAPI('POST', 'user');

let changeSettingsFutureLinks = body =>
  requestAPI('POST', 'user/settings/future-links', { body });

export let userAPI = { create, changeSettingsFutureLinks };
