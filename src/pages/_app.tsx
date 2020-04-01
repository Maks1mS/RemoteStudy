import { Global, css } from '@emotion/core'

export default function MyApp ({ Component, pageProps }) {
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
    <Component {...pageProps} />
  </>
}
