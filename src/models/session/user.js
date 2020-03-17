import { createStore, createEvent } from 'effector';

export let addUserSession = createEvent();
export let removeUserSession = createEvent();

export let $user = createStore(null);

$user.on(addUserSession, (_, newUser) => newUser);

$user.reset(removeUserSession);
