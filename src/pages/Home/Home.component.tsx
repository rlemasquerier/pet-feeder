import React, { Component, ReactNode } from 'react';
import { ScrollView, Text, View, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import firebase from 'react-native-firebase';
import moment, { Moment } from 'moment';
import { getAllRecords, postRecordByDate } from '../../api/apiClient';
import { dateToString, computeDayHalf } from '../../services';
import { Page, Card, Calendar, TopBanner } from '../../components';
import { FeedPetButton } from './components/FeedPetButton';
import { User, Records } from '../../types/types';
import theme from '../../theme';

const TOP_BANNER_HEIGHT = 50;

interface State {
  selectedDate: Moment;
  records: Records | undefined;
}
export interface Props {
  user: User;
}

export class Home extends Component<NavigationScreenProps & Props, State> {
  public state = { selectedDate: moment(), records: undefined };

  public onDateChange = (date: Date) => {
    this.setState({ selectedDate: moment(date) });
  };

  public onPressFeed = async () => {
    await postRecordByDate(dateToString(this.state.selectedDate), this.props.user.name as string);
    const updatedRecords = await getAllRecords();
    this.setState({ records: updatedRecords as Records });
  };

  private logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      });
  };

  public componentDidMount = async () => {
    const records = await getAllRecords();
    this.setState({ records: records as Records });
  };

  public getMorningTitle = () => {
    if (this.state.records) {
      // @ts-ignore
      const todayRecord = this.state.records[dateToString(this.state.selectedDate)];
      if (!!todayRecord && !!todayRecord.morning) {
        return `Ce matin à ${todayRecord.morning.timestamp}`;
      }
    }
    return 'Ce matin';
  };

  public getMorningLabel = () => {
    if (!this.state.records) {
      return 'Chargement...';
    }
    // @ts-ignore
    const todayRecord = this.state.records[dateToString(this.state.selectedDate)];
    if (!todayRecord || !todayRecord.morning) {
      return "Gaïa attend d'être nourrie";
    }
    return `Gaïa a été nourrie par ${todayRecord.morning.feeder}`;
  };

  public getEveningTitle = () => {
    if (this.state.records) {
      // @ts-ignore
      const todayRecord = this.state.records[dateToString(this.state.selectedDate)];
      if (!!todayRecord && !!todayRecord.evening) {
        return `Ce soir à ${todayRecord.evening.timestamp}`;
      }
    }
    return 'Ce soir';
  };

  public getEveningLabel = () => {
    if (!this.state.records) {
      return 'Chargement...';
    }
    // @ts-ignore
    const todayRecord = this.state.records[dateToString(this.state.selectedDate)];
    if (!todayRecord || !todayRecord.evening) {
      return "Gaïa attend d'être nourrie";
    }
    return `Gaïa a été nourrie par ${todayRecord.evening.feeder}`;
  };

  public getButtonStatus = () => {
    const selectedDate = this.state.selectedDate;
    if (!this.state.records) {
      return 'invisible';
    }
    const isToday = moment().isSame(selectedDate, 'days');
    if (!isToday) {
      return 'invisible';
    }
    // @ts-ignore
    const todayRecord = this.state.records[dateToString(selectedDate)];
    if (!todayRecord || !todayRecord[computeDayHalf(selectedDate)]) {
      return 'active';
    }
    return 'inactive';
  };

  public render(): ReactNode {
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
          <ScrollView>
            <Card title={this.getMorningTitle()} content={this.getMorningLabel()} />
            <Card title={this.getEveningTitle()} content={this.getEveningLabel()} />
            <FeedPetButton onPress={this.onPressFeed} status={this.getButtonStatus()} />
          </ScrollView>
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
