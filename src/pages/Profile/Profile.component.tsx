import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ProfileDetails } from './ProfileDetails';
import { TribeMenu } from './TribeMenu';
import theme from 'pet-feeder/src/theme';
import { pageWithAnimatedMenu } from 'pet-feeder/src/hoc/PageWithAnimatedMenu/pageWithAnimatedMenu';

export const Profile = () => {
  const AnimatedProfilePage = pageWithAnimatedMenu(ProfileDetails, TribeMenu);
  return (
    <AnimatedProfilePage
      pageContainerStyle={styles.profilePageContainer}
      menuContainerStyle={styles.menuContainer}
    />
  );
};

interface Style {
  profilePageContainer: ViewStyle;
  menuContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  profilePageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 3 * theme.margins.unit,
    backgroundColor: theme.colors.backgroundColor,
  },
  menuContainer: {
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
