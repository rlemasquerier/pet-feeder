import React, { Component, ReactNode } from 'react';
import { View, Text, ViewStyle, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { dateToFromNowDaily } from './utils/dateHelpers';
import moment, { Moment } from 'moment';
import theme from '../../theme';
import { locale } from './utils/locale';

//@ts-ignore
const daySelectionAnimation: IDaySelectionAnimationBackground = {
  type: 'background',
  duration: 200,
  highlightColor: theme.colors.backgroundColor,
};

interface State {
  selectedDate: Date | Moment;
}

export class Calendar extends Component<{}, State> {
  public state = { selectedDate: moment() };
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <CalendarStrip
          style={styles.calendar}
          calendarColor={theme.colors.banner}
          locale={locale}
          daySelectionAnimation={daySelectionAnimation}
          onDateSelected={date => {
            this.setState({ selectedDate: date });
          }}
        />
        <Text>{this.state.selectedDate && dateToFromNowDaily(this.state.selectedDate)}</Text>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  calendar: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    marginHorizontal: -theme.margins.pagePadding,
    marginBottom: 2 * theme.margins.unit,
    backgroundColor: theme.colors.white,
    ...theme.borders.shadow,
  },
  calendar: {
    backgroundColor: theme.colors.white,
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
  },
});
