import React from 'react';

import styles from './main.module.css';
import { MainNavigation } from 'components/navigation/main';

export const MainLayout = props => {
  return (
    <div className={styles.layout}>
      <MainNavigation />
      <main className={styles['layout_main']}>{props.children}</main>
    </div>
  );
};
