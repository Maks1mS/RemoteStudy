import Cors from 'micro-cors'

import { ApolloServer, gql } from 'apollo-server-micro'

import Telegraph from 'telegra.ph'
import { Page } from 'telegra.ph/typings/telegraph'

import timetable from '../../lib/timetable'
import folders from '../../lib/subjects'

import PageParser from '../../lib/PageParser'
import CloudDrive, { createUrl } from '../../lib/CloudDrive'

const typeDefs = gql`

  type Lesson {
    name: String
  }

  type Subject {
    key: String
    name: String
    url: String
    tasks: [Lesson]
  }

  type News {
    title: String
    isHot: Boolean
  }

  type Query {
    timetable: [Subject]
    news: [News]
    subjects: [Subject]
  }
`

type PageData = {
  title: string
  isNews: boolean
  isHot: boolean
  subject: string
  date: string
}

const resolvers = {
  Query: {
    timetable () {
      const date = new Date()
      date.setDate(new Date().getDate())
      return timetable(date)
    },
    async news (parent, _args, { dataSources }: { dataSources: DataSources}): Promise<unknown> {
      const pages = await dataSources.pages.get()
      return pages.filter(page => page.isNews)
    },
    async subjects (_parent, _args, { dataSources }) {
      return Object.keys(folders).map(async key => {
        const subject = folders[key]
        return {
          key,
          name: subject[0],
          url: createUrl(subject[1], subject[2])
        }
      })
    }
  },
  Subject: {
    async tasks (parent, _args, { dataSources }): Promise<unknown> {
      const data = await dataSources.drive.getFiles(parent.key)
      return data
    }
  }
}

type DataSources = {
  pages: PageParser
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  dataSources: () => {
    return {
      pages: new PageParser(process.env.TOKEN) as unknown,
      drive: new CloudDrive()
    }
  }
})

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS']
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default cors(apolloServer.createHandler({ path: '/api/graphql' }))
