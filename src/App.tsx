import React from 'react';
import { YellowBox } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigator } from './AppNavigator';
import { persistor, store } from './redux/store';
import { setTopLevelNavigator } from './services/navigation';
import { client } from './apollo/initClient';
import codePush from 'react-native-code-push';

// Remove this and YellowBox after this issue is resolved https://github.com/expo/expo/issues/4455
YellowBox.ignoreWarnings(['LottieAnimationView.getConstants']);
YellowBox.ignoreWarnings(["UIManager['LottieAnimationView']"]);
YellowBox.ignoreWarnings(['Require cycle: node_modules/react-native-paper']);

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

export const App = codePush()(RootComponent);
