import React from 'react';

import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

import App from './App';
import { MERNG_SERVER } from './config.js';

const httpLink = createHttpLink({
  uri: MERNG_SERVER
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function ApolloProviderApp() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default ApolloProviderApp;
