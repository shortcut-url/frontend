import React from 'react';

import s from './index.module.css';
import { classNames } from 'lib/utils/class-names';

export let Checkbox = ({
  children,
  containerClass = '',
  disabled = false,
  ...props
}) => {
  let rootClassName = classNames(s.root, containerClass);
  let inputClassName = classNames(
    s.input,
    disabled ? 'convex' : undefined,
    !disabled ? 'flat concave_hover pressed_active' : undefined
  );

  return (
    <label className={rootClassName}>
      <input
        className={inputClassName}
        disabled={disabled}
        type="checkbox"
        {...props}
      />

      {children}
    </label>
  );
};
