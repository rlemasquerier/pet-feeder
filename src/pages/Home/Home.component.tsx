import React, { Component, ReactNode } from 'react';
import { Text, View, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import moment, { Moment } from 'moment';
import { dateToString } from '../../services';
import { Page, Calendar, TopBanner } from '../../components';
import { DayScrollView } from './components/DayScrollView/DayScrollView.component';
import { User } from '../../types/types';
import theme from '../../theme';

interface State {
  selectedDate: Moment;
}
interface OwnProps {
  user?: User;
  logout: () => void;
}

export type Props = OwnProps & NavigationScreenProps;

export class Home extends Component<Props, State> {
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
