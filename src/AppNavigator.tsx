/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import React from 'react';
import {
  createAppContainer,
  NavigationContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from './components';
import { IconName } from './components/Icon/Icon.component';
import theme from './theme';
import * as Pages from './pages';

const TAB_BAR_ICON_SIZE = 25;
const TAB_BAR_HEIGHT = 55;

const ConnectedTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Pages.Home,
      navigationOptions: {
        title: 'Accueil',
      },
    },
    Statistics: {
      screen: Pages.Statistics,
      navigationOptions: {
        title: 'Statistiques',
      },
    },
    Reminders: {
      screen: Pages.Reminders,
      navigationOptions: {
        title: 'Rappels',
      },
    },
    Profile: {
      screen: Pages.Profile,
      navigationOptions: {
        title: 'Profil',
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      showLabel: false,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        const color = focused ? theme.colors.primary : theme.colors.secondaryAction;
        let iconName: IconName;
        switch (routeName) {
          case 'Home':
            iconName = 'home3';
            break;
          case 'Reminders':
            iconName = 'bell';
            break;
          case 'Statistics':
            iconName = 'calendar';
            break;
          case 'Profile':
            iconName = 'user';
            break;
          default:
            throw Error('Error: no icon name defined for this route name');
        }
        return <Icon name={iconName} size={TAB_BAR_ICON_SIZE} color={color} />;
      },
    }),
    tabBarOptions: {
      style: {
        height: TAB_BAR_HEIGHT,
      },
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

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
