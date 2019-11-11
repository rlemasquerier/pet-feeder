import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationParams,
} from 'react-navigation';

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

let topLevelNavigator: NavigationContainerComponent | null = null;

export const setTopLevelNavigator = (navigatorRef: NavigationContainerComponent | null): void => {
  topLevelNavigator = navigatorRef;
};

export const navigator = {
  navigate: (routeName: PageNameType, params?: NavigationParams): boolean => {
    if (!topLevelNavigator) {
      return false;
    }

    const action = NavigationActions.navigate({ params, routeName });
    topLevelNavigator.dispatch(action);

    return true;
  },
};
