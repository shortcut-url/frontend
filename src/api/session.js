import { requestAPI } from 'lib/request/api';

let getInitialSession = ({ options }) => requestAPI('GET', 'session', options);

let createSession = ({ email, password }) =>
  requestAPI('POST', 'session', { body: { email, password } });

let destroySession = () => requestAPI('DELETE', 'session');

export let sessionAPI = { getInitialSession, createSession, destroySession };
