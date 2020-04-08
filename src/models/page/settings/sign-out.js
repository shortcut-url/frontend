import { createEffect } from 'effector';

import { sessionAPI } from 'api/session';
import Router from 'next/router';

export let destroySession = createEffect();

destroySession.use(sessionAPI.destroySession);

destroySession.done.watch(() => {
  Router.push('/');
});
