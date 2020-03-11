import { requestAPI } from 'lib/request';

let create = () => requestAPI('POST', 'url');

export let urlAPI = { create };
