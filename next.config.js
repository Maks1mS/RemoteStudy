require('dotenv').config()
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withFonts = require('next-fonts')
module.exports = withFonts({
  env: {
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS
  }
})
