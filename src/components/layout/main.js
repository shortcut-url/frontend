import React from 'react';

import s from './main.module.css';
import { MainNavigation } from 'components/navigation';
import { NotificationList } from 'components/notification';
import { classNames } from 'lib/utils/class-names';

export let MainLayout = ({ children, mainClassName = '' }) => {
  mainClassName = classNames(s.main, mainClassName);

  return (
    <div className={s.root}>
      <MainNavigation />

      <main className={mainClassName}>{children}</main>

      <footer className={s.footer} />

      <NotificationList />
    </div>
  );
};
