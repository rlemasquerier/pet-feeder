import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationParams,
} from 'react-navigation';

let topLevelNavigator: NavigationContainerComponent | null = null;

export const setTopLevelNavigator = (navigatorRef: NavigationContainerComponent | null): void => {
  topLevelNavigator = navigatorRef;
};

export const navigator = {
  navigate: (routeName: string, params?: NavigationParams): boolean => {
    if (!topLevelNavigator) {
      return false;
    }

    const action = NavigationActions.navigate({ params, routeName });
    topLevelNavigator.dispatch(action);

    return true;
  },
};
