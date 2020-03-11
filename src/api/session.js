import { requestAPI } from 'lib/request';

let get = () => requestAPI('GET', 'session');

export let sessionAPI = { get };
