import React, { Component, ReactNode } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Page, TopBanner, Loader } from '../../components';
import { User } from '../../types';
import theme from '../../theme';
import { checkPermission } from 'pet-feeder/src/services/notifications';
import { PAGES } from 'pet-feeder/src/services/navigation';
import { HomeContent } from './components/HomeContent';

interface OwnProps {
  user?: User;
  resetOnLogout: () => void;
  logout: () => void;
  updateUserFCM: (input: { variables: { id: string; fcmToken: string | undefined } }) => void;
}

export type Props = OwnProps & NavigationScreenProps;

export class Home extends Component<Props> {
  public componentDidUpdate = async () => {
    if (this.props.user) {
      // TODO: Find a way not to run this logic at each component update
      try {
        const fcmToken = await checkPermission();
        if (!!fcmToken && fcmToken !== this.props.user.fcmToken) {
          this.props.updateUserFCM({ variables: { id: this.props.user.id, fcmToken } });
        }
      } catch (error) {
        console.warn("Couldn't setup notifications for this user : ", error);
      }
    }
  };

  private logout = () => {
    this.props.logout();
    this.props.resetOnLogout();
    this.props.navigation.navigate(PAGES.LOGIN);
  };

  public render(): ReactNode {
    if (!this.props.user) {
      return <Loader size={30} />;
    }
    if (!this.props.user.tribeMember[0]) {
      return null;
    }
    return (
      <Page>
        <TopBanner>
          <Text style={styles.topBannerText}>Bonjour {this.props.user.name} !</Text>
          <Text style={styles.topBannerText} onPress={this.logout}>
            Logout
          </Text>
        </TopBanner>
        <HomeContent user={this.props.user} />
      </Page>
    );
  }
}

interface Style {
  topBannerText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  topBannerText: {
    ...theme.fonts.regular,
    color: theme.colors.white,
  },
});
