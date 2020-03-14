import React, { useEffect, createRef } from 'react';

import styles from './index.module.css';

export const SingleError = props => {
  let containerElement = createRef();

  useEffect(() => {
    containerElement.current.focus();
  });

  return (
    <div
      ref={containerElement}
      className={styles.error}
      role="alert"
      tabIndex="0"
    >
      {props.children}
    </div>
  );
};
