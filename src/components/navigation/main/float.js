import React, { useState } from 'react';

import s from './float.module.css';
import { Button } from 'components/button';
import { classNames } from 'lib/utils/class-names';

export const NavigationFloat = ({ children }) => {
  let [isOpenMobileNavigation, setOpenMobileNavigation] = useState(false);
  let [prevScroll, setPrevScroll] = useState(0);

  function openMobileNavigation() {
    setOpenMobileNavigation(true);

    setPrevScroll(window.scrollY);

    document.body.style.top = `-${window.scrollY}px`;
    document.body.classList.add('is-locked');
  }

  function closeMobileNavigation() {
    setOpenMobileNavigation(false);

    document.body.style.top = '';
    document.body.classList.remove('is-locked');
    window.scrollTo(0, prevScroll);
  }

  function handleContainerClick(event) {
    if (event.target.closest('a')) {
      closeMobileNavigation();
    }
  }

  function handleClickButtonMobileNavigation() {
    if (isOpenMobileNavigation) {
      closeMobileNavigation();
      return;
    }

    openMobileNavigation();
  }

  let containerClassName = classNames(
    s.container,
    isOpenMobileNavigation && s['--is-open']
  );
  let floatButtonClassName = classNames(
    s.float_button,
    isOpenMobileNavigation && s['--is-open']
  );

  return (
    <>
      <div onClick={handleContainerClick} className={containerClassName}>
        {children}
      </div>

      <div className={s.float}>
        <Button
          onClick={handleClickButtonMobileNavigation}
          className={floatButtonClassName}
          title={`${isOpenMobileNavigation ? 'Close menu' : 'Open menu'}`}
          aria-expanded={isOpenMobileNavigation}
          aria-controls="navigation_menu"
          type="button"
        />
      </div>
    </>
  );
};
