import { requestAPI } from 'lib/request';

let getSettingsFutureURLs = () =>
  requestAPI('GET', 'user/settings/future-urls');

let createUserWithEmail = userData =>
  requestAPI('POST', 'user', { body: userData });

let changeParameterFutureURLs = body =>
  requestAPI('POST', 'user/settings/future-urls', { body });

let getCreatedURLs = ({ startIndex = 0, stopIndex = 20 }) =>
  requestAPI(
    'GET',
    `user/created-urls?startIndex=${startIndex}&stopIndex=${stopIndex}`
  );

export let userAPI = {
  createUserWithEmail,
  getSettingsFutureURLs,
  changeParameterFutureURLs,
  getCreatedURLs
};
