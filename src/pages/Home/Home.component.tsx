import React, { Component, ReactNode } from 'react';
import { Text, View, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import moment, { Moment } from 'moment';
import { dateToString } from '../../services';
import { Page, Calendar, TopBanner } from '../../components';
import { DayScrollView } from './components/DayScrollView/DayScrollView.component';
import { User } from '../../types/types';
import theme from '../../theme';

const TOP_BANNER_HEIGHT = 50;

interface State {
  selectedDate: Moment;
}
export interface Props {
  user?: User;
  logout: () => void;
}

export class Home extends Component<NavigationScreenProps & Props, State> {
  public state = { selectedDate: moment() };

  public onDateChange = (date: Date) => {
    this.setState({ selectedDate: moment(date) });
  };

  private logout = () => {
    this.props.logout();
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
          <DayScrollView dayString={dateToString(this.state.selectedDate)} />
        </View>
      </Page>
    );
  }
}

interface Style {
  content: ViewStyle;
  topBanner: ViewStyle;
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
  topBanner: {
    height: TOP_BANNER_HEIGHT,
    backgroundColor: theme.colors.banner,
    paddingHorizontal: 2 * theme.margins.unit,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBannerText: {
    ...theme.fonts.regular,
    color: theme.colors.white,
  },
  calendarContainer: {
    paddingHorizontal: 4 * theme.margins.unit,
  },
});
