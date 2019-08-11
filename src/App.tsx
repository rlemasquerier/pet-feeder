import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigator } from './AppNavigator';
import { persistor, store } from './redux/store';
import { setTopLevelNavigator } from './services/navigation';
import { client } from './apollo/initClient';

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
