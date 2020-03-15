import { requestAPI } from 'lib/request';

let create = () => requestAPI('POST', 'user');

export let userAPI = { create };
