import React from 'react';

import styles from './main.module.css';
import { MainNavigation } from 'components/navigation/main';
import { NotificationList } from 'components/notification';

export const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <MainNavigation />
      <main className={styles['layout_main-content']}>{children}</main>
      <NotificationList />
    </div>
  );
};
