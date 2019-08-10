import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-client-preset';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import environment from './environment';
import { AppNavigator } from './AppNavigator';
import { persistor, store } from './redux/store';
import { setTopLevelNavigator } from './services/navigation';

const httpLink = new HttpLink({ uri: `${environment.API_URL}/graphql` });

const authLink = new ApolloLink((operation, forward) => {
  const token = store.getState().authentication.accessToken;
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={client}>
            <AppNavigator ref={setTopLevelNavigator} />
          </ApolloProvider>
        </PersistGate>
      </Provider>
    );
  }
}
