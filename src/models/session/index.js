import { createStoreObject } from 'effector';

import { $user } from './user';

export let $session = createStoreObject({ user: $user });

export { addUserSession } from './user';
