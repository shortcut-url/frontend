import React, { useState } from 'react';

import { Button } from 'components/button';
import styles from './float.module.css';

export let NavigationFloat = ({ children }) => {
  let [isOpenMobileNavigation, setOpenMobileNavigation] = useState(false);
  let [prevScroll, setPrevScroll] = useState(0);

  function handleContainerClick(event) {
    if (event.target.tagName === 'A') {
      setOpenMobileNavigation(true);
    }
  }

  function handleButtonToggleClick() {
    if (!isOpenMobileNavigation) {
      setOpenMobileNavigation(true);
      setPrevScroll(window.scrollY);

      document.body.style.top = `-${window.scrollY}px`;
      document.body.classList.add('is-locked');

      return;
    }

    setOpenMobileNavigation(false);

    document.body.style.top = '';
    document.body.classList.remove('is-locked');
    window.scrollTo(0, prevScroll);
  }

  return (
    <>
      <div
        onClick={handleContainerClick}
        className={`${
          isOpenMobileNavigation
            ? styles['nav_is-open']
            : styles['nav_is-close']
        }`}
      >
        {children}
      </div>

      <div className={styles.nav_float}>
        <Button
          onClick={() => handleButtonToggleClick()}
          className={`${
            isOpenMobileNavigation ? styles.nav_close : styles.nav_open
          }`}
          title={`${isOpenMobileNavigation ? 'Close menu' : 'Open menu'}`}
        />
      </div>
    </>
  );
};
