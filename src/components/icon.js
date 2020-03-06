import React from 'react';

const getIconPath = (name, props) => {
  switch (name) {
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      );
    case 'user':
      return (
        <svg {...props}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
    case 'box':
      return (
        <svg {...props}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      );

    default:
      return <path />;
  }
};
export const Icon = ({
  name = undefined,
  size = '18',
  fill = 'none',
  viewBox = '0 0 24 24',
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  stroke = 'currentColor',
  strokeWidth = 2,
  ...props
}) =>
  getIconPath(name, {
    xmlns: 'http://www.w3.org/2000/svg',
    role: 'img',
    width: size,
    height: size,
    fill,
    viewBox,
    strokeLinecap,
    strokeLinejoin,
    stroke,
    strokeWidth,
    ...props
  });
