import { requestAPI } from 'lib/request';

let getInitialSession = options => requestAPI('GET', 'session', options);

let createSession = data => requestAPI('POST', 'session', { body: data });

export let sessionAPI = { getInitialSession, createSession };
