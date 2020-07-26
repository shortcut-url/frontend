import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import s from './index.module.css';
import { MainLayout } from 'components/layout';
import { classNames } from 'lib/utils/class-names';
import { Button } from 'components/button';

const ErrorPage404 = () => {
  let { errorText: error } = useRouter().query;

  let errorText = error || '404 - Page Not Found';

  return (
    <>
      <Head>
        <title>{errorText}</title>
      </Head>

      <MainLayout mainClassName={s.layout_main}>
        <InformationCard errorText={errorText} />
      </MainLayout>
    </>
  );
};

const InformationCard = ({ errorText }) => {
  let { callbackLinkHref, callbackLinkText } = useRouter().query;

  let rootClassName = classNames('flat', s.root);

  return (
    <div className={rootClassName}>
      <h1 className={s.title}>{errorText}</h1>

      <Link href={callbackLinkHref || '/'} passHref>
        <Button tag="a" variant="accent">
          {callbackLinkText || 'Home page'}
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage404;
