import withApollo from 'next-with-apollo'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: ApolloLink.from([
        new BatchHttpLink({ uri: '/api/graphql' }),
        new HttpLink({ uri: '/api/graphql' })
      ]),
      cache: new InMemoryCache().restore(initialState || {})
    })
  },
  {
    // eslint-disable-next-line react/display-name
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      )
    }
  }
)
