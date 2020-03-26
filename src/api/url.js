import { requestAPI } from 'lib/request';

let createShortUrl = () => requestAPI('POST', 'url');

let getCreatedURLData = ({ url }) => requestAPI('GET', `url/${url}`);

let changeParameterCreatedURL = ({ url, name, value }) =>
  requestAPI('POST', `url/${url}/settings`, { body: { name, value } });

let deleteCreatedURL = ({ url }) => requestAPI('DELETE', `url/${url}`);

export let urlAPI = {
  createShortUrl,
  getCreatedURLData,
  changeParameterCreatedURL,
  deleteCreatedURL
};
