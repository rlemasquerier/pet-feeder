import { createAppContainer, NavigationContainer, createSwitchNavigator } from 'react-navigation';
import * as Pages from './pages';

export const RootNavigator: NavigationContainer = createSwitchNavigator({
  Loader: {
    screen: Pages.Loader,
  },
  Login: {
    screen: Pages.Login,
  },
  Home: {
    screen: Pages.Home,
  },
});

export const AppNavigator = createAppContainer(RootNavigator);
