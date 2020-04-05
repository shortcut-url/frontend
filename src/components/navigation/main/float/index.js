import React, { useState, useEffect } from 'react';

import { Button } from 'components/button';
import styles from './index.module.css';

export let NavigationFloat = (props) => {
  let [isOpenMobileNavigation, setOpenMobileNavigation] = useState(false);

  useEffect(() => {
    if (isOpenMobileNavigation) {
      document.body.classList.add('is-locked');
    } else {
      document.body.classList.remove('is-locked');
    }
  }, [isOpenMobileNavigation]);

  function handleContainerClick(event) {
    if (event.target.tagName === 'A') {
      setOpenMobileNavigation(true);
    }
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
        {props.children}
      </div>

      <div className={styles.nav_float}>
        <Button
          onClick={() => setOpenMobileNavigation(!isOpenMobileNavigation)}
          className={`${
            isOpenMobileNavigation ? styles.nav_close : styles.nav_open
          }`}
          title={`${isOpenMobileNavigation ? 'Close menu' : 'Open menu'}`}
        />
      </div>
    </>
  );
};
