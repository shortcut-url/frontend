import React from 'react';

import styles from './main.module.css';
import { MainNavigation } from 'components/navigation';
import { NotificationList } from 'components/notification';

export let MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <MainNavigation />

      <main className={styles['layout_main-content']}>{children}</main>

      <footer className={styles['layout_footer']} />

      <NotificationList />
    </div>
  );
};
