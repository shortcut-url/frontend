import { createStore, createEvent, createEffect } from 'effector';

import { userAPI } from 'api/user';
import { createFetching } from 'lib/request';

export let addUserSession = createEvent();
export let removeUserSession = createEvent();

export let $user = createStore(null);

$user.on(addUserSession, (_, newUser) => newUser);

$user.reset(removeUserSession);

/*
 * Avatar
 */

export let uploadAvatar = createEffect();
export let uploadAvatarFetching = createFetching(uploadAvatar);

export let deleteAvatar = createEffect();
export let deleteAvatarFetching = createFetching(deleteAvatar);

$user
  .on(uploadAvatar.done, (user, { result }) => ({
    ...user,
    srcAvatar: result.data
  }))
  .on(deleteAvatar.done, (user) => ({
    ...user,
    srcAvatar: null
  }));

uploadAvatar.use(userAPI.uploadAvatar);

deleteAvatar.use(userAPI.deleteAvatar);
