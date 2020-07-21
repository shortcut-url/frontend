import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    let initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="
                Shortcut-URL is a convenient,fast contractor for your URLs
                with the ability to track statistics and other data
              "
          />

          <link
            rel="shortcut icon"
            href="/images/favicon.svg"
            type="image/svg+xml"
          />

          <link rel="manifest" href="/manifest.json" />

          <meta name="theme-color" content="#e0e5ec" />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
