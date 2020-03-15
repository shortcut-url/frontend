import React, { useEffect, createRef } from 'react';

import styles from './index.module.css';
import commonStyles from '../common.module.css';

export let ErrorList = ({ children }) => {
  let containerElement = createRef();

  useEffect(() => {
    containerElement.current.focus();
  });

  let item = (error, index) => (
    <li key={index} className={`${commonStyles.error} ${styles['list-item']}`}>
      {error}
    </li>
  );

  let errors = children.map
    ? children.map(item)
    : Object.values(children).map(item);

  return (
    <ul
      ref={containerElement}
      className={styles.list}
      role="alert"
      tabIndex="0"
    >
      {errors}
    </ul>
  );
};
