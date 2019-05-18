import {
  createAppContainer,
  NavigationContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import * as Pages from './pages';

const ConnectedTabNavigator = createBottomTabNavigator({
  Home: Pages.Home,
  Reminders: Pages.Reminders,
  Statistics: Pages.Statistics,
  Profile: Pages.Profile,
});

export const RootNavigator: NavigationContainer = createSwitchNavigator({
  Loader: {
    screen: Pages.Loader,
  },
  Login: {
    screen: Pages.Login,
  },
  Home: ConnectedTabNavigator,
});

export const AppNavigator = createAppContainer(RootNavigator);
