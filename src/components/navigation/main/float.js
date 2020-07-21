import React, { useState } from 'react';

import s from './float.module.css';
import { Button } from 'components/button';
import { classNames } from 'lib/utils/class-names';

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

  let containerClassName = classNames(
    isOpenMobileNavigation ? s['container_is-open'] : s['container_is-close']
  );
  let floatButtonClassName = classNames(
    isOpenMobileNavigation ? s['float_close'] : s['float_open']
  );

  return (
    <>
      <div onClick={handleContainerClick} className={containerClassName}>
        {children}
      </div>

      <div className={s.float}>
        <Button
          onClick={handleButtonToggleClick}
          className={floatButtonClassName}
          title={`${isOpenMobileNavigation ? 'Close menu' : 'Open menu'}`}
        />
      </div>
    </>
  );
};
