import { requestAPI } from 'lib/request';

let createUserWithEmail = () => requestAPI('POST', 'user');

let changeParameterFutureURLs = body =>
  requestAPI('POST', 'user/settings/future-urls', { body });

let getCreatedURLs = ({ startIndex = 0, stopIndex = 20 }) =>
  requestAPI(
    'GET',
    `user/created-urls?startIndex=${startIndex}&stopIndex=${stopIndex}`
  );

export let userAPI = {
  createUserWithEmail,
  changeParameterFutureURLs,
  getCreatedURLs
};
