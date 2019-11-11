/* eslint-disable react/display-name */

import React from 'react';
import {
  createAppContainer,
  NavigationContainer,
  createSwitchNavigator,
  NavigationDescriptor,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from './components';
import { IconName } from './components/Icon/Icon.component';
import theme from './theme';
import * as Pages from './pages';

export const PAGES = {
  HOME: 'HOME',
  LOGIN: 'LOGIN',
  LOADER: 'LOADER',
  PROFILE: 'PROFILE',
  REMINDERS: 'REMINDERS',
  STATISTICS: 'STATISTICS',
  SIGNUP: 'SIGNUP',
  JOIN_OR_CREATE_TRIBE: 'JOIN_OR_CREATE_TRIBE',
};

export type PageNameType = keyof typeof PAGES;

const TAB_BAR_ICON_SIZE = 25;
const TAB_BAR_HEIGHT = 55;

const ConnectedTabNavigator = createBottomTabNavigator(
  {
    [PAGES.HOME]: {
      screen: Pages.Home,
      navigationOptions: {
        title: 'Accueil',
      },
    },
    [PAGES.STATISTICS]: {
      screen: Pages.Statistics,
      navigationOptions: {
        title: 'Statistiques',
      },
    },
    [PAGES.REMINDERS]: {
      screen: Pages.Reminders,
      navigationOptions: {
        title: 'Rappels',
      },
    },
    [PAGES.PROFILE]: {
      screen: Pages.Profile,
      navigationOptions: {
        title: 'Profil',
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }: { navigation: NavigationDescriptor }) => ({
      showLabel: false,
      tabBarIcon: ({ focused }: { focused: boolean }) => {
        const { routeName } = navigation.state;
        const color = focused ? theme.colors.primary : theme.colors.secondaryAction;
        let iconName: IconName;
        switch (routeName) {
          case PAGES.HOME:
            iconName = 'home3';
            break;
          case PAGES.REMINDERS:
            iconName = 'bell';
            break;
          case PAGES.STATISTICS:
            iconName = 'calendar';
            break;
          case PAGES.PROFILE:
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

const OnboardingStack = createStackNavigator(
  {
    [PAGES.LOGIN]: {
      screen: Pages.Login,
    },
    [PAGES.SIGNUP]: {
      screen: Pages.Signup,
    },
    [PAGES.JOIN_OR_CREATE_TRIBE]: {
      screen: Pages.JoinOrCreateTribe,
    },
  },
  {
    headerMode: 'none',
  }
);

export const RootNavigator: NavigationContainer = createSwitchNavigator({
  [PAGES.LOADER]: {
    screen: Pages.Loader,
  },
  [PAGES.LOGIN]: OnboardingStack,
  [PAGES.HOME]: ConnectedTabNavigator,
});

export const AppNavigator = createAppContainer(RootNavigator);
