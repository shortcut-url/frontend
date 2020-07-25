import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import { MainLayout } from 'components/layout';
import {
  addCreatedURLsCurrentUser,
  resetCreatedURLsCurrentUser
} from './store';
import { userAPI } from 'api/user';
import { ListCreatedURLs } from './_list-created-urls';
import { Header } from './_header';

export default ({ listCreatedURLsCurrentUser }) => {
  let userSession = useStore($session).user;

  useEffect(() => {
    if (userSession) return;

    Router.push('/login');
  }, [userSession]);

  if (!userSession) return null;

  useEffect(() => {
    addCreatedURLsCurrentUser(listCreatedURLsCurrentUser);

    return () => {
      resetCreatedURLsCurrentUser();
    };
  }, [listCreatedURLsCurrentUser]);

  return (
    <>
      <Head>
        <title>Your profile</title>
      </Head>

      <MainLayout>
        <Header />

        <ListCreatedURLs />
      </MainLayout>
    </>
  );
};

export let getServerSideProps = async ({ req }) => {
  let getCreatedURLsCurrentUserResponse = await userAPI.getCreatedURLs({
    startIndex: 0,
    stopIndex: 20,
    options: {
      headers: {
        cookie: req ? req.headers.cookie : null
      }
    }
  });

  return {
    props: {
      listCreatedURLsCurrentUser: getCreatedURLsCurrentUserResponse.data
    }
  };
};
