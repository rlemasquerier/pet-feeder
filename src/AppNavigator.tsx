/* eslint-disable react/display-name */

import React from 'react';
import { createAppContainer, NavigationContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TabBar } from './components';
import theme from './theme';
import * as Pages from './pages';
import { PAGES } from 'pet-feeder/src/services/navigation';

const ProfileStack = createStackNavigator(
  {
    [PAGES.PROFILE]: {
      screen: Pages.Profile,
      navigationOptions: {
        header: null,
      },
    },
    [PAGES.TAB_BAR_PLAYGROUND]: {
      screen: Pages.TabBarPlayground,
    },
    [PAGES.BINARY_SWITCH_PLAYGROUND]: {
      screen: Pages.BinarySwitchPlayground,
    },
    [PAGES.COMPONENTS_LIBRARY_MENU]: {
      screen: Pages.ComponentsLibraryMenu,
    },
  },
  {
    navigationOptions: {
      title: 'Profil',
    },
  }
);

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
    [PAGES.PROFILE]: ProfileStack,
  },
  {
    tabBarComponent: (props: ReactNavigationBottomTabBarProps) => (
      <TabBar
        {...props}
        height={50}
        backgroundColor={theme.colors.primary}
        iconNames={['home3', 'calendar', 'bell', 'user']}
      />
    ),
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
