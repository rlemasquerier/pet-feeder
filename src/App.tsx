import React from 'react';
import { YellowBox } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigator } from './AppNavigator';
import { persistor, store } from './redux/store';
import { setTopLevelNavigator } from './services/navigation';
import { client } from './apollo/initClient';
import environment from 'pet-feeder/src/environment';
import codePush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';

// Remove this and YellowBox after this issue is resolved https://github.com/expo/expo/issues/4455
YellowBox.ignoreWarnings(['LottieAnimationView.getConstants']);
YellowBox.ignoreWarnings(["UIManager['LottieAnimationView']"]);
YellowBox.ignoreWarnings(['Require cycle: node_modules/react-native-paper']);

if (environment.ENV !== 'local') {
  Sentry.init({
    dsn: 'https://b8afadb198474d008cb343e98728fda0@sentry.io/1871669',
  });
}

class RootComponent extends React.Component {
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

export const App = environment.ENV === 'staging' ? codePush()(RootComponent) : RootComponent;
