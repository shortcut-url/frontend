import { createStore, createEvent, createEffect } from 'effector';
import { userAPI } from 'api/user';

export let addCreatedURLsCurrentUser = createEvent();
export let resetCreatedURLsCurrentUser = createEvent();

export let downloadCreatedURLsCurrentUser = createEffect();

export let $createdURLsCurrentUser = createStore([]);

$createdURLsCurrentUser
  .on(addCreatedURLsCurrentUser, (createdURLs, newCreatedURLs) => {
    return [...createdURLs, ...newCreatedURLs];
  })
  .reset(resetCreatedURLsCurrentUser);

downloadCreatedURLsCurrentUser.use(userAPI.getCreatedURLs);

downloadCreatedURLsCurrentUser.done.watch(({ result }) => {
  if (!result.ok) return;

  addCreatedURLsCurrentUser(result.data);
});
