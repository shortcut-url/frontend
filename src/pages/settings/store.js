import { createEffect } from 'effector';
import Router from 'next/router';

import { sessionAPI } from 'api/session';

export let destroySession = createEffect();

destroySession.use(sessionAPI.destroySession);

destroySession.done.watch(() => {
  Router.push('/');
});
