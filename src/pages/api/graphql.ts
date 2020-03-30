import Cors from 'micro-cors'

import { ApolloServer, gql } from 'apollo-server-micro'

import Telegraph from 'telegra.ph'
import { Page } from 'telegra.ph/typings/telegraph'

const client = new Telegraph(process.env.TOKEN)

const typeDefs = gql`

  type News {
    title: String
    isHot: Boolean
  }

  type Query {
    sayHello: String
    news: [News]
  }
`

type PageData = {
  title: string;
  isNews: boolean;
  isHot: boolean;
}

const parsePage = (page: Page): PageData => {
  const pageData = {
    title: page.title,
    content: page.content,
    isNews: false,
    isHot: false
  }
  const title = page.title.replace(/\[([A-Z]*)\]/g, (match, token) => {
    console.log(token)
    switch (token) {
      case 'NEWS':
        pageData.isNews = true
        break
      case 'HOT':
        pageData.isHot = true
    }
    return ''
  })
  pageData.title = title.trim()
  return pageData
}

const resolvers = {
  Query: {
    sayHello (): string {
      return 'Hello World!'
    },
    async news (): Promise<unknown> {
      const { pages } = await client.getPageList()
      return pages.map(page => {
        const pageData = parsePage(page)
        if (pageData.isNews) {
          return pageData
        }
      })
    }
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, tracing: true })

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS']
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default cors(apolloServer.createHandler({ path: '/api/graphql' }))
