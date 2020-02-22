import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationParams,
  NavigationBackActionPayload,
} from 'react-navigation';

export type PageNameType =
  | 'HOME'
  | 'LOGIN'
  | 'LOADER'
  | 'PROFILE'
  | 'REMINDERS'
  | 'STATISTICS'
  | 'SIGNUP'
  | 'JOIN_OR_CREATE_TRIBE'
  | 'COMPONENTS_LIBRARY_MENU'
  | 'TAB_BAR_PLAYGROUND'
  | 'BINARY_SWITCH_PLAYGROUND'
  | 'CUSTOM_ACTIONS';

export const PAGES: { [key in PageNameType]: PageNameType } = {
  HOME: 'HOME',
  LOGIN: 'LOGIN',
  LOADER: 'LOADER',
  PROFILE: 'PROFILE',
  REMINDERS: 'REMINDERS',
  STATISTICS: 'STATISTICS',
  SIGNUP: 'SIGNUP',
  JOIN_OR_CREATE_TRIBE: 'JOIN_OR_CREATE_TRIBE',
  COMPONENTS_LIBRARY_MENU: 'COMPONENTS_LIBRARY_MENU',
  TAB_BAR_PLAYGROUND: 'TAB_BAR_PLAYGROUND',
  BINARY_SWITCH_PLAYGROUND: 'BINARY_SWITCH_PLAYGROUND',
  CUSTOM_ACTIONS: 'CUSTOM_ACTIONS',
};

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
  back: (options?: NavigationBackActionPayload) => {
    if (!topLevelNavigator) {
      return false;
    }

    const action = NavigationActions.back(options);
    topLevelNavigator.dispatch(action);

    return true;
  },
};
