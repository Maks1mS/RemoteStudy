/* eslint-disable @typescript-eslint/camelcase */

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url): void => {
  window.gtag('config', process.env.GOOGLE_ANALYTICS, {
    page_path: url
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

function isDev (): boolean {
  return process.env.NODE_ENV !== 'production'
}

export const shouldTrack = !isDev()
