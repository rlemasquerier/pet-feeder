import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationParams,
} from 'react-navigation';
import { PageNameType } from '../AppNavigator';

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
