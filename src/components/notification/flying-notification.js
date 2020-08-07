import React, { useEffect } from 'react';

import { removeNotification } from 'models/notification';
import { classNames } from 'lib/utils/class-names';

import s from './notification.module.css';

export const FlyingNotificationItem = ({
  duration = 2000,
  id,
  content,
  coords,
  element,
  className
}) => {
  useEffect(() => {
    let removeNotificationHandler = () => removeNotification(id);
    setTimeout(removeNotificationHandler, duration);
  }, [id, duration]);

  /*
   * If the user clicks on an item not through a touchpad or mouse,
   * the coordinates are 0. Therefore, the notification is displayed
   * from the top in the middle of the element that was clicked.
   */
  if (!coords.left && !coords.top) {
    let elementCoords = element.getBoundingClientRect();

    coords = {
      top: elementCoords.y + window.pageYOffset,
      left: elementCoords.x + window.pageXOffset + elementCoords.width / 2
    };
  }

  let rootClassName = classNames('flat', s.root, className);

  let rootStyle = {
    '--duration': `${duration}ms`,

    top: coords.top,
    left: coords.left
  };

  return (
    <div className={rootClassName} style={rootStyle}>
      {content}
    </div>
  );
};
