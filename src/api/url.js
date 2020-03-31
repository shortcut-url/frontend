import { requestAPI } from 'lib/request';

let createShortUrl = originalURL =>
  requestAPI('POST', 'url', { body: { originalURL } });

let getCreatedURLData = ({ url, options }) =>
  requestAPI('GET', `url/${url}`, options);

let changeParameterCreatedURL = ({ url, name, value }) =>
  requestAPI('POST', `url/${url}/parameter`, { body: { name, value } });

let deleteCreatedURL = ({ url }) => requestAPI('DELETE', `url/${url}`);

export let urlAPI = {
  createShortUrl,
  getCreatedURLData,
  changeParameterCreatedURL,
  deleteCreatedURL
};
