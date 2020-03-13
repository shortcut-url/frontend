import { requestAPI } from 'lib/request';

let get = options => requestAPI('GET', 'session', options);

export let sessionAPI = { get };
