import React from 'react';

import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider as AP
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { MERNG_SERVER } from '../config';

const httpLink = createHttpLink({
  uri: MERNG_SERVER
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  if (!token) return headers;
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function ApolloProvider({ children }) {
  return (
    <AP client={client}>
      {children}
    </AP>
  );
}

export default ApolloProvider;
