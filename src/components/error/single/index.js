import React, { useEffect, createRef } from 'react';

import commonStyles from '../common.module.css';

export let SingleError = props => {
  let containerElement = createRef();

  useEffect(() => {
    containerElement.current.focus();
  });

  return (
    <div
      ref={containerElement}
      className={commonStyles.error}
      role="alert"
      tabIndex="0"
    >
      {props.children}
    </div>
  );
};
