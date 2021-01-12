import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

import { MERNG_SERVER } from './config.js'

const httpLink = createHttpLink({
  uri: MERNG_SERVER
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

function ApolloProviderApp() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default ApolloProviderApp
