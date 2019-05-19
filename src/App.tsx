import React from 'react';
import { Provider } from 'react-redux';
import { AppNavigator } from './AppNavigator';
import { store } from './redux/store';
import { setTopLevelNavigator } from './services/navigation';

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <AppNavigator ref={setTopLevelNavigator} />
      </Provider>
    );
  }
}
