import React from 'react';

import styles from './main.module.css';
import { MainNavigation } from 'components/navigation/main';
import { Notifications } from 'components/notifications';

export const MainLayout = props => {
  return (
    <div className={styles.layout}>
      <MainNavigation />
      <main className={styles['layout_main']}>{props.children}</main>
      <Notifications />
    </div>
  );
};
