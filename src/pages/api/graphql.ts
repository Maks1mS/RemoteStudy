import Cors from 'micro-cors'

import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`

const resolvers = {
  Query: {
    sayHello (): string {
      return 'Hello World!'
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
