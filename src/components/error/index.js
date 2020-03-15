import React from 'react';

import { SingleError } from './single';
import { ErrorList } from './list';
import commonErrorStyle from './common.module.css';
import listErrorStyle from './list/index.module.css';

export { commonErrorStyle, listErrorStyle };

let Error = ({ children }) => {
  let typeofError = typeof children;

  if (typeofError === 'string') return <SingleError>{children}</SingleError>;

  if (typeofError === 'object') return <ErrorList>{children}</ErrorList>;
};

export { Error, SingleError, ErrorList };
