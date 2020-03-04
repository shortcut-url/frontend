import { createEvent, createStore } from 'effector';

export const sessionChange = createEvent();

export const $session = createStore(null);

$session.on(sessionChange, (_, user) => user);
