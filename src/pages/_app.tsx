import Head from 'next/head'
import Router from 'next/router'
import { Global, css } from '@emotion/core'
import App from 'next/app'
import * as gtag from '../lib/gtag'
import 'emoji-mart/css/emoji-mart.css'

if (gtag.shouldTrack) {
  Router.events.on('routeChangeComplete', url => gtag.pageview(url))
}

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
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
}

export default MyApp
