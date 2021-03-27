import React from 'react';

import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider as AP
} from '@apollo/client';

import { MERNG_SERVER } from '../config';

const httpLink = createHttpLink({
  uri: MERNG_SERVER
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function ApolloProvider() {
  return <AP client={client} />;
}

export default ApolloProvider;
