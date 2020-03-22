/* eslint-disable react/display-name */

import React from 'react';
import { createAppContainer, NavigationContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TabBar } from './components';
import theme from './theme';
import * as Pages from './pages';
import { PAGES } from 'pet-feeder/src/services/navigation';
import { Menu } from './pages/ComponentsLibrary/AnimatedMenu/Menu';

const ComponentsLibraryStack = createStackNavigator(
  {
    [PAGES.COMPONENTS_LIBRARY_MENU]: {
      screen: Pages.ComponentsLibraryMenu,
    },
    [PAGES.TAB_BAR_PLAYGROUND]: {
      screen: Pages.TabBarPlayground,
    },
    [PAGES.BINARY_SWITCH_PLAYGROUND]: {
      screen: Pages.BinarySwitchPlayground,
    },
  },
  {
    navigationOptions: {
      title: 'Profil',
    },
    headerMode: 'none',
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
    [PAGES.PROFILE]: {
      screen: Pages.Profile,
      navigationOptions: {
        title: 'Profil',
      },
    },
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

const ConnectedStack = createStackNavigator(
  {
    [PAGES.HOME]: ConnectedTabNavigator,
    [PAGES.COMPONENTS_LIBRARY_MENU]: ComponentsLibraryStack,
    [PAGES.CUSTOM_ACTIONS]: { screen: Pages.CustomActions },
    [PAGES.PRIVACY_POLICY]: { screen: Pages.PrivacyPolicy },
  },
  {
    headerMode: 'none',
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
    screen: Menu,
  },
  [PAGES.LOGIN]: OnboardingStack,
  [PAGES.HOME]: ConnectedStack,
});

export const AppNavigator = createAppContainer(RootNavigator);
