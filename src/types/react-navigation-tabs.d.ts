declare module 'react-navigation-tabs';

interface ReactNavigationBottomTabBarProps {
  navigation: any;
  onTabPress: any;
  onTabLongPress: any;
  getAccessibilityLabel: (props: { route: any }) => string;
  getAccessibilityRole: (props: { route: any }) => string;
  getAccessibilityStates: (props: { route: any }) => string[];
  getButtonComponent: ({ route }: { route: any }) => any;
  getLabelText: ({ route }: { route: any }) => any;
  getTestID: (props: { route: any }) => string;
  renderIcon: any;
  dimensions: { width: number; height: number };
  isLandscape: boolean;
  safeAreaInset: { top: string; right: string; bottom: string; left: string };
}
