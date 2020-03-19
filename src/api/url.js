import { requestAPI } from 'lib/request';

let createShortUrl = () => requestAPI('POST', 'url');

export let urlAPI = { createShortUrl };
