import { requestAPI } from 'lib/request';

let createShortUrl = originalURL =>
  requestAPI('POST', 'url', { body: { originalURL } });

export let urlAPI = { createShortUrl };
