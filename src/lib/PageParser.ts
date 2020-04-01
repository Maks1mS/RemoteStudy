import Telegraph from 'telegra.ph'
import { Page } from 'telegra.ph/typings/telegraph'
import Subjects from './subjects'

type PageData = {
  title: string
  subject: string
  date: string
  isNews: boolean
  isHot: boolean
}

const parsedPages = []

const parsePage = (page: Page): PageData => {
  const pageData: PageData = {
    title: page.title,
    subject: '',
    date: '',
    isNews: false,
    isHot: false
  }
  // \[([A-Z-().\d]*)\] \[([A-Z]*)(?:\((3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\))?\]
  const title = page.title.replace(/\[([A-Z-().\d]*)\]/g, (match, token: string) => {
    // console.log(token)
    switch (token) {
      case 'NEWS':
        pageData.isNews = true
        break
      case 'HOT':
        pageData.isHot = true
        break
      default: {
        const matches = token.match(/([A-Z-\d]+)\((?:(\d?\d)\.(\d?\d))\)/)
        if (Object.keys(Subjects).includes(matches[1])) {
          pageData.subject = matches[1]
          console.log(parseInt(matches[3]), parseInt(matches[2]))
          const date = new Date(new Date().getFullYear(), parseInt(matches[3]) - 1, parseInt(matches[2]))
          pageData.date = date.toDateString()
        }
      }
    }
    return ''
  })
  pageData.title = title.trim()
  return pageData
}

class PageParser {
  _client: Telegraph
  _cache: PageData[] = []
  constructor (token: string) {
    this._client = new Telegraph(token)
  }

  async get (): Promise<PageData[]> {
    if (!this._cache.length) {
      const { pages } = await this._client.getPageList()
      this._cache = pages.map(page => {
        const data: PageData = {
          title: page.title,
          subject: '',
          date: '',
          isNews: false,
          isHot: false
        }

        const title = page.title.replace(/\[([A-Z-().\d]*)\]/g, (match, token: string) => {
          if (token === 'NEWS') {
            data.isNews = true
          }
          if (token === 'HOT') {
            data.isHot = true
          }

          const matches = token.match(/([A-Z-\d]+)\((?:(\d?\d)\.(\d?\d))\)/)

          if (matches === null) return ''

          const subject = matches[1]
          const month = parseInt(matches[3])
          const day = parseInt(matches[2])

          if (Object.keys(Subjects).includes(matches[1])) {
            data.subject = subject

            const date = new Date(new Date().getFullYear(), month - 1, day)
            data.date = date.toDateString()
          }
          return ''
        })

        data.title = title.trim()

        return data
      })
    }
    return this._cache
  }
}

export default PageParser
