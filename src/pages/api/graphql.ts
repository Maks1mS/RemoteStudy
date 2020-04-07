import Cors from 'micro-cors'

import { ApolloServer, gql, ApolloError } from 'apollo-server-micro'

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
    subject(key: String): Subject
    isDayOff: Boolean
  }
`

type Lesson = {
  name?: string
}

type Subject = {
  key?: string
  name?: string
  url?: string
  tasks?: [Lesson]
}

const isDayOff = (): boolean => {
  const date = new Date()
  const day = date.getDay() === 0 ? 6 : date.getDay() - 1
  return (day > 4)
}

const resolvers = {
  Query: {
    isDayOff,
    timetable (parent) {
      if (!isDayOff()) {
        const date = new Date()
        return timetable(date)
      }
      return []
    },
    async news (_parent, _args, { dataSources }: { dataSources: DataSources}): Promise<unknown> {
      const pages = await dataSources.pages.get()
      return pages.filter(page => page.isNews)
    },
    async subject (_parent, { key }): Promise<Subject> {
      const sub = folders[key]
      if (!sub) throw new ApolloError(`${key} does not exist!`)
      return {
        key,
        name: sub[0],
        url: createUrl(sub[1], sub[2])
      }
    },
    async subjects (_parent, _args) {
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
