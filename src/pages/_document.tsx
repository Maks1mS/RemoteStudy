/* eslint-disable @typescript-eslint/camelcase */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Router from 'next/router'
import { shouldTrack } from '../lib/gtag'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    // const shouldNotTrack = !isLocal('localhost') && !isDev()
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>
          { shouldTrack && <><script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `
            }}
          /></>
          }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
