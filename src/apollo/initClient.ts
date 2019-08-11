import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-client-preset';
import environment from '../environment';
import { customFetch } from './customFetch';
import { store } from '../redux/store';

const httpLink = new HttpLink({
  uri: `${environment.API_URL}/graphql`,
  fetch: customFetch,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = store.getState().authentication.accessToken;
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
