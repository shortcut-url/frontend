import React from 'react';

import { sessionAPI } from 'api/session';
import { sessionChange } from 'models/session';
import '../global.css';

export default function MyApp({ Component, pageProps, user }) {
  sessionChange(user);

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async () => {
  let res = await sessionAPI.get();

  if (!res.ok) return {};

  let user = res.data;

  return { user };
};
