import React, { useEffect, createRef } from 'react';

import styles from './error.module.css';

export let Error = ({ children }) => {
  if (typeof children === 'object') {
    return <ErrorList>{children}</ErrorList>;
  }

  return <SingleError>{children}</SingleError>;
};

let SingleError = ({ children }) => {
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
      {children}
    </div>
  );
};

export let ErrorList = ({ children }) => {
  let containerElement = createRef();

  useEffect(() => {
    containerElement.current.focus();
  });

  let item = (error, index) => (
    <li key={index} className={`${styles.error} ${styles['error-list_item']}`}>
      {error}
    </li>
  );

  let errors = children.map
    ? children.map(item)
    : Object.values(children).map(item);

  return (
    <ul
      ref={containerElement}
      className={styles['error-list']}
      role="alert"
      tabIndex="0"
    >
      {errors}
    </ul>
  );
};