/* eslint-disable @typescript-eslint/camelcase */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Router from 'next/router'

function isLocal (host): boolean {
  return location.hostname === host
}

function isDev (): boolean {
  return process.env.NODE_ENV !== 'production'
}

class MyDocument extends Document {
  shoudTrack = true

  static async getInitialProps (ctx) {
    // const shouldNotTrack = !isLocal('localhost') && !isDev()
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

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
        gtag('config', process.env.GA_TRACKING_ID, {
          page_location: url,
          page_title: document.title
        })
      }, 0)
    })
  }

  render () {
    return (
      <Html>
        <Head>
          {this.shoudTrack && <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
          />}
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
