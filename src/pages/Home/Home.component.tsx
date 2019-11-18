import React, { Component, ReactNode } from 'react';
import { Text, View, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import moment, { Moment } from 'moment';
import { Page, Calendar, TopBanner, Loader } from '../../components';
import { DayScrollView } from './components/DayScrollView/DayScrollView.component';
import { User } from '../../types';
import theme from '../../theme';
import { checkPermission } from 'pet-feeder/src/services/notifications';
import { PAGES } from 'pet-feeder/src/services/navigation';

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
        if (!!fcmToken && fcmToken !== this.props.user.fcmToken) {
          this.props.updateUserFCM({ variables: { id: this.props.user.id, fcmToken } });
        }
      } catch (error) {
        console.warn("Couldn't setup notifications for this user : ", error);
      }
    }
  };

  public onDateChange = (date: Date) => {
    this.setState({ selectedDate: moment(date) });
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
        <View style={styles.content}>
          <View style={styles.calendarContainer}>
            <Calendar selectedDate={this.state.selectedDate} onDateChange={this.onDateChange} />
          </View>
          <DayScrollView
            selectedDate={this.state.selectedDate}
            tribeId={this.props.user.tribeMember[0]}
          />
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
