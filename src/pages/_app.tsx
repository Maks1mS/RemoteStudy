/* eslint-disable @typescript-eslint/camelcase */
import Head from 'next/head'
import Router from 'next/router'
import { Global, css } from '@emotion/core'
import 'emoji-mart/css/emoji-mart.css'
import App from 'next/app'

class MyApp extends App {
  componentDidMount () {
    let { gtag, dataLayer } = window
    console.log('HERE!')
    dataLayer = dataLayer || []
    gtag = function (...args): void {
      console.log(args)
      dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', process.env.GOOGLE_ANALYTICS)
    Router.events.on('routeChangeComplete', url => {
      setTimeout(() => {
        console.log('test!')
        gtag('config', process.env.GOOGLE_ANALYTICS, {
          page_location: url,
          page_title: document.title
        })
      }, 0)
    })
  }

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

export default MyApp
