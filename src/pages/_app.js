import React from 'react';
import fetch from 'node-fetch';

import { sessionChange } from 'models/session';
import '../global.css';

export default function MyApp({ Component, pageProps, user }) {
  sessionChange(user);

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async () => {
  let res = await fetch('http://localhost:8080/session');

  if (!res.ok) return {};

  let user = await res.json();

  return { user };
};
