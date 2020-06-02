import React from 'react';

import styles from './main.module.css';
import { MainNavigation } from 'components/navigation';
import { NotificationList } from 'components/notification';
import { classNames } from 'lib/utils/class-names';

export let MainLayout = ({ children, mainClassName = '' }) => {
  mainClassName = classNames(styles['layout_main-content'], mainClassName);

  return (
    <div className={styles.layout}>
      <MainNavigation />

      <main className={mainClassName}>{children}</main>

      <footer className={styles['layout_footer']} />

      <NotificationList />
    </div>
  );
};
