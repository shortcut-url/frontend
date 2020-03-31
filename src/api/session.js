import { requestAPI } from 'lib/request';

let getInitialSession = ({ options }) => requestAPI('GET', 'session', options);

let createSession = ({ email, password }) =>
  requestAPI('POST', 'session', { body: { email, password } });

export let sessionAPI = { getInitialSession, createSession };
