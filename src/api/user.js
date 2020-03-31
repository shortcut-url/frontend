import { requestAPI } from 'lib/request';

let createUserWithEmail = userData =>
  requestAPI('POST', 'user', { body: userData });

let getSettingsFutureURLs = ({ options }) =>
  requestAPI('GET', 'user/settings/future-urls', options);

let changeParameterFutureURLs = ({ name, value }) =>
  requestAPI('POST', 'user/settings/future-urls', { body: { name, value } });

let getCreatedURLs = ({ startIndex = 0, stopIndex = 20, options }) =>
  requestAPI(
    'GET',
    `user/created-urls?startIndex=${startIndex}&stopIndex=${stopIndex}`,
    options
  );

export let userAPI = {
  createUserWithEmail,
  getSettingsFutureURLs,
  changeParameterFutureURLs,
  getCreatedURLs
};
