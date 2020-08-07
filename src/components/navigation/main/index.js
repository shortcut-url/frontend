import React from 'react';
import Link from 'next/link';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import { Avatar } from 'components/avatar';
import { Button } from 'components/button';
import { classNames } from 'lib/utils/class-names';

import s from './index.module.css';
import { NavigationFloat } from './float';

export const MainNavigation = () => {
  let currentUser = useStore($session).user;

  let rootClassName = classNames(s.root, 'flat');

  return (
    <NavigationFloat>
      <nav className={rootClassName} id="navigation_menu">
        <ul className={s.menu}>
          <li>
            <Link href="/">
              <a className={s.menu_home} rel="home">
                Shortcut-URL.com
              </a>
            </Link>
          </li>

          {!currentUser && <AuthNavigationList />}

          {currentUser && <LinkToProfileCurrentUser />}
        </ul>
      </nav>
    </NavigationFloat>
  );
};

const AuthNavigationList = () => {
  return <LinkItemList href="/login">Login</LinkItemList>;
};

let LinkItemList = ({ href, children, ...props }) => {
  let linkClassName = classNames(
    'concave_hover',
    'pressed_active',
    s.menu_link
  );

  return (
    <li>
      <Link href={href}>
        <a className={linkClassName} {...props}>
          {children}
        </a>
      </Link>
    </li>
  );
};

const LinkToProfileCurrentUser = () => {
  let currentUser = useStore($session).user;

  return (
    <li className={s.profile}>
      <Avatar />

      <div className={s.profile_name} title="Your name">
        {currentUser.name}
      </div>

      <Link href="/profile" passHref>
        <Button tag="a" variant="accent">
          Your profile
        </Button>
      </Link>
    </li>
  );
};
