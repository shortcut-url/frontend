import React, { useEffect, createRef } from 'react';

import s from './error.module.css';
import { classNames } from 'lib/utils/class-names';

export const Error = ({ children }) => {
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
    <div ref={containerElement} className={s.error} role="alert" tabIndex="0">
      {children}
    </div>
  );
};

export const ErrorList = ({ children }) => {
  let containerElement = createRef();

  useEffect(() => {
    containerElement.current.focus();
  });

  let itemClassName = classNames(s.error, s['list_item']);

  let item = (error, index) => (
    <li key={index} className={itemClassName}>
      {error}
    </li>
  );

  let errors = children.map
    ? children.map(item)
    : Object.values(children).map(item);

  return (
    <ul ref={containerElement} className={s.list} role="alert" tabIndex="0">
      {errors}
    </ul>
  );
};
