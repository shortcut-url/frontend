import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useStore } from 'effector-react';

import { MainLayout } from 'components/layout';
import { JoinForm } from './_form';
import { $session } from 'models/session';

const JoinPage = () => {
  let userSession = useStore($session).user;

  useEffect(() => {
    if (!userSession) return;

    Router.push('/');
  }, [userSession]);

  if (userSession) return null;

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>

      <MainLayout>
        <JoinForm />
      </MainLayout>
    </>
  );
};

export default JoinPage;
