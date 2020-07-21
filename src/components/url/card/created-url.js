import React, { forwardRef } from 'react';

import s from './created-url-card.module.css';
import { classNames } from 'lib/utils/class-names';
import { ButtonStyles } from 'components/button';

export const CardBase = (
  {
    tag: Tag = 'button',
    url,
    originalURL,
    addNotificationWhenCopying = true,
    onClick,
    ...props
  },
  ref
) => {
  let urlWithServerDomain = `${process.env.API_SERVER}/${url}`;

  let rootClassName = classNames(
    ButtonStyles.reset_button,
    'flat',
    'convex_hover',
    'pressed_active',
    s.card
  );

  function handleClick() {
    onClick({ url: urlWithServerDomain });
  }

  return (
    <Tag
      className={rootClassName}
      onClick={Tag === 'button' ? handleClick : undefined}
      ref={ref}
      {...props}
    >
      <h3 className={s['card_heading']}>{urlWithServerDomain}</h3>

      <div className={s['card_original-url']} title={originalURL}>
        Original url: {originalURL}
      </div>
    </Tag>
  );
};

let CreatedUrlCard = forwardRef(CardBase);

export { CreatedUrlCard };
