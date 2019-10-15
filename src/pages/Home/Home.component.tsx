import React, { Component, ReactNode } from 'react';
import { Text, View, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import moment, { Moment } from 'moment';
import { Page, Calendar, TopBanner } from '../../components';
import { DayScrollView } from './components/DayScrollView/DayScrollView.component';
import { User } from '../../types';
import theme from '../../theme';
import { checkPermission } from 'pet-feeder/src/services/notifications';

interface State {
  selectedDate: Moment;
}
interface OwnProps {
  user?: User;
  resetOnLogout: () => void;
  logout: () => void;
  updateUserFCM: (input: { variables: { id: string; fcmToken: string | undefined } }) => void;
}

export type Props = OwnProps & NavigationScreenProps;

export class Home extends Component<Props, State> {
  public state = { selectedDate: moment() };

  public componentDidUpdate = async () => {
    if (this.props.user) {
      // TODO: Find a way not to run this logic at each component update
      try {
        const fcmToken = await checkPermission();
        if (fcmToken !== this.props.user.fcmToken) {
          this.props.updateUserFCM({ variables: { id: this.props.user.id, fcmToken } });
        }
      } catch (error) {
        console.warn(
          "Couldn't check if user has allowed notifications. Firebase may have a bad initialization : ",
          error
        );
      }
    }
  };

  public onDateChange = (date: Date) => {
    this.setState({ selectedDate: moment(date) });
  };

  private logout = () => {
    this.props.logout();
    this.props.resetOnLogout();
    this.props.navigation.navigate('Login');
  };

  public render(): ReactNode {
    return (
      <Page>
        <TopBanner>
          <Text style={styles.topBannerText}>
            Bonjour {this.props.user && this.props.user.name} !
          </Text>
          <Text style={styles.topBannerText} onPress={this.logout}>
            Logout
          </Text>
        </TopBanner>
        <View style={styles.content}>
          <View style={styles.calendarContainer}>
            <Calendar selectedDate={this.state.selectedDate} onDateChange={this.onDateChange} />
          </View>
          <DayScrollView selectedDate={this.state.selectedDate} />
        </View>
      </Page>
    );
  }
}

interface Style {
  content: ViewStyle;
  topBannerText: TextStyle;
  calendarContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  content: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.backgroundColor,
  },
  topBannerText: {
    ...theme.fonts.regular,
    color: theme.colors.white,
  },
  calendarContainer: {
    paddingHorizontal: 4 * theme.margins.unit,
  },
});
