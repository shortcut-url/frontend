import React, { forwardRef } from 'react';

import { classNames } from 'lib/utils/class-names';

import s from './button.module.css';

const ButtonBase = (
  {
    tag: Tag = 'button',
    variant = 'default',
    color = 'default',
    className = '',
    disabled = false,
    children,
    ...props
  },
  ref
) => {
  let rootClassName = classNames(
    s.root,
    s.reset_button,
    variant === 'default' &&
      (disabled ? 'concave' : 'flat convex_hover pressed_active'),
    (variant === 'accent' || variant === 'danger') &&
      classNames(s.color_button, s[`button_${variant}`]),
    Tag !== 'button' && disabled && s.disabled,
    className
  );

  return (
    <Tag ref={ref} className={rootClassName} disabled={disabled} {...props}>
      <span className={s.text}>{children}</span>
    </Tag>
  );
};

const Button = forwardRef(ButtonBase);

export { Button, s as ButtonStyles };
