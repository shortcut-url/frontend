import React from 'react';
import { useStore } from 'effector-react';
import Link from 'next/link';

import { $session } from 'models/session';
import { Button } from 'components/button';
import { classNames } from 'lib/utils/class-names';
import { Avatar } from 'components/avatar';

import s from './index.module.css';
import commonStyle from '../index.module.css';

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

      <Link href="/settings" passHref>
        <Button tag="a">Settings</Button>
      </Link>
    </header>
  );
};
