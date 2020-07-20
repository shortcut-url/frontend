import React from 'react';
import Link from 'next/link';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import styles from './index.module.css';
import { Avatar } from 'components/avatar';
import { Button } from 'components/button';
import { NavigationFloat } from './float';

export let MainNavigation = () => {
  let currentUser = useStore($session).user;

  return (
    <NavigationFloat>
      <nav className={`${styles.nav} flat `}>
        <Link href="/">
          <a className={styles.nav_home} title="Go to the home page.">
            Shortcut-URL.com
          </a>
        </Link>

        {!currentUser && <AuthNavigationList />}

        {currentUser && <LinkToProfileCurrentUser />}
      </nav>
    </NavigationFloat>
  );
};

let LinkItemList = ({ href, children, ...props }) => {
  return (
    <li>
      <Link href={href}>
        <a
          className={`${styles['list_link']} concave_hover pressed_active`}
          {...props}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

let AuthNavigationList = () => {
  return (
    <ul className={styles.list}>
      <LinkItemList href="/login">Login</LinkItemList>
    </ul>
  );
};

let LinkToProfileCurrentUser = () => {
  let currentUser = useStore($session).user;

  return (
    <div className={styles.profile}>
      <Avatar />

      <div className={styles['profile_name']} title="Your name">
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
