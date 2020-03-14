import { requestAPI } from 'lib/request';

let get = options => requestAPI('GET', 'session', options);

let create = data => requestAPI('POST', 'session', { body: data });

export let sessionAPI = { get, create };
