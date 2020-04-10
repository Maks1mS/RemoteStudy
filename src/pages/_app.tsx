import Head from 'next/head'
import Router from 'next/router'
import withGA from 'next-ga'
import { Global, css } from '@emotion/core'
import 'emoji-mart/css/emoji-mart.css'

function MyApp ({ Component, pageProps }): JSX.Element {
  return <>
    <Global styles={css`
        @font-face {
          font-family: 'Roboto';
          src: url('/fonts/Roboto-Regular.ttf');
        }
        @font-face {
          font-family: 'Roboto';
          src: url('/fonts/Roboto-Bold.ttf');
          font-weight: bold;
        }
        #__next, html, body {
          background-color: #F0F0F0;
          color: #212529;
          font-family: 'Roboto';
          margin: 0;
          height: 100%;
        }
        h1, h2, h3, h4 {
          margin: 0;
        }
    `}/>
    <Head>
      <title>Remote Study</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default withGA(process.env.GOOGLE_ANALYTICS, Router)(MyApp)
