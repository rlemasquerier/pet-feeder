import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigator } from './AppNavigator';
import { persistor, store } from './redux/store';
import { setTopLevelNavigator } from './services/navigation';

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator ref={setTopLevelNavigator} />
        </PersistGate>
      </Provider>
    );
  }
}
