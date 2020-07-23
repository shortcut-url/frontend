import React from 'react';
import Link from 'next/link';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import s from './index.module.css';
import { Avatar } from 'components/avatar';
import { Button } from 'components/button';
import { NavigationFloat } from './float';
import { classNames } from 'lib/utils/class-names';

export let MainNavigation = () => {
  let currentUser = useStore($session).user;

  let rootClassName = classNames(s.root, 'flat');

  return (
    <NavigationFloat>
      <nav className={rootClassName} id="navigation_menu">
        <Link href="/">
          <a className={s.logo} title="Go to the home page.">
            Shortcut-URL.com
          </a>
        </Link>

        {!currentUser && <AuthNavigationList />}

        {currentUser && <LinkToProfileCurrentUser />}
      </nav>
    </NavigationFloat>
  );
};

let AuthNavigationList = () => {
  return (
    <ul className={s.list}>
      <LinkItemList href="/login">Login</LinkItemList>
    </ul>
  );
};

let LinkItemList = ({ href, children, ...props }) => {
  let linkClassName = classNames(
    s['list_link'],
    'concave_hover',
    'pressed_active'
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

let LinkToProfileCurrentUser = () => {
  let currentUser = useStore($session).user;

  return (
    <div className={s.profile}>
      <Avatar />

      <div className={s['profile_name']} title="Your name">
        {currentUser.name}
      </div>

      <Link href="/profile" passHref>
        <Button tag="a" variant="accent">
          Your profile
        </Button>
      </Link>
    </div>
  );
};
