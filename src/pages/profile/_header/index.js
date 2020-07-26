import React from 'react';
import { useStore } from 'effector-react';

import commonStyle from '../index.module.css';
import s from './index.module.css';
import { $session } from 'models/session';
import { Button } from 'components/button';
import { classNames } from 'lib/utils/class-names';
import { Avatar } from 'components/avatar';

export const Header = () => {
  let currentUser = useStore($session).user;

  let rootClassName = classNames(commonStyle.container, s.root);

  return (
    <header className={rootClassName}>
      <Avatar
        containerClass={s['avatar-container']}
        withAvatarManagement={true}
      />

      <h1 className={s['current-user-name']}>{currentUser.name}</h1>

      <Button tag="a" href="/settings">
        Settings
      </Button>
    </header>
  );
};
