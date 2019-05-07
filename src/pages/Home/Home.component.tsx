import React, { Component, ReactNode } from 'react';
import { ScrollView, Text, View, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import firebase from 'react-native-firebase';
import moment, { Moment } from 'moment';
import { getAllRecords, postRecordByDate } from '../../api/apiClient';
import { dateToString } from '../../services';
import { Page, Card, Calendar, RoundButton } from '../../components';
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

  public getMorningLabel = () => {
    if (!this.state.records) {
      return 'Chargement...';
    }
    // @ts-ignore
    const todayRecord = this.state.records[dateToString(this.state.selectedDate)];
    if (!todayRecord || !todayRecord.morning) {
      return 'La gamelle de Gaïa est vide !';
    }
    return `Gaïa a été nourrie par ${todayRecord.morning.feeder}`;
  };

  public getEveningLabel = () => {
    if (!this.state.records) {
      return 'Chargement...';
    }
    // @ts-ignore
    const todayRecord = this.state.records[dateToString(this.state.selectedDate)];
    if (!todayRecord || !todayRecord.evening) {
      return 'La gamelle de Gaïa est vide !';
    }
    return `Gaïa a été nourrie par ${todayRecord.evening.feeder}`;
  };

  public render(): ReactNode {
    return (
      <Page>
        <View style={styles.topBanner}>
          <Text style={styles.topBannerText}>Bonjour {this.props.user.name} !</Text>
          <Text style={styles.topBannerText} onPress={this.logout}>
            Logout
          </Text>
        </View>
        <View style={styles.content}>
          <Calendar selectedDate={this.state.selectedDate} onDateChange={this.onDateChange} />
          <ScrollView>
            <Card title="Matin" content={this.getMorningLabel()} />
            <Card title="Soir" content={this.getEveningLabel()} />
            <View style={styles.buttonsContainer}>
              <RoundButton
                iconName="cross"
                color={theme.colors.secondaryAction}
                iconColor={theme.colors.white}
                onPress={() => {}}
              />
              <RoundButton
                iconName="spoon-knife"
                color={theme.colors.action}
                iconColor={theme.colors.black}
                onPress={this.onPressFeed}
              />
            </View>
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
  buttonsContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  content: {
    flex: 1,
    overflow: 'hidden',
    paddingHorizontal: theme.margins.pagePadding,
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
  buttonsContainer: {
    marginVertical: 5 * theme.margins.unit,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
