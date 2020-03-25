import React, { forwardRef } from 'react';

import styles from './index.module.css';

export let Button = forwardRef(
  (
    {
      tag: Tag = 'button',
      variant = 'default',
      color = 'default',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    let classes = defineButtonVariant({
      variant,
      extraClass: className,
      disabled: props.disabled
    });

    classes += defineButtonColor({
      color
    });

    return (
      <Tag ref={ref} className={classes} {...props}>
        {children}
      </Tag>
    );
  }
);

let defineButtonVariant = ({ variant, extraClass, disabled }) => {
  let classes = `${styles.reset_button}`;

  switch (variant) {
    case 'default':
      classes += `
        flat 
        ${disabled ? 'concave' : 'convex_hover pressed_active'}
      `;
      break;

    case 'accent':
      classes += `
        ${styles.color_button}
        ${styles.button_accent}
      `;
      break;

    case 'danger':
      classes += `
        ${styles.color_button}
        ${styles.button_danger}
      `;
      break;

    default:
      break;
  }

  classes += extraClass;

  return classes;
};

let defineButtonColor = ({ color }) => {
  let classes = '';

  return classes;
};

export { styles as ButtonStyles };
