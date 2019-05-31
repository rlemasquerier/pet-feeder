import React, { Component, ReactNode } from 'react';
import { View, Text, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { dateToFromNowDaily } from './utils/dateHelpers';
import { Moment } from 'moment';
import theme from '../../theme';
import { locale } from './utils/locale';

//@ts-ignore
const daySelectionAnimation: IDaySelectionAnimationBackground = {
  type: 'background',
  duration: 200,
  highlightColor: theme.colors.backgroundColor,
};

interface Props {
  selectedDate: Date | Moment;
  onDateChange: (date: Date) => void;
}

export class Calendar extends Component<Props, {}> {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <CalendarStrip
          style={styles.calendar}
          calendarColor={theme.colors.primary}
          locale={locale}
          daySelectionAnimation={daySelectionAnimation}
          onDateSelected={this.props.onDateChange}
          calendarHeaderContainerStyle={{ marginBottom: 4 * theme.margins.unit }}
          iconStyle={{ marginHorizontal: 2 * theme.margins.unit }}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>
            {this.props.selectedDate && dateToFromNowDaily(this.props.selectedDate)}
          </Text>
        </View>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  calendar: ViewStyle;
  bottomContainer: ViewStyle;
  bottomText: TextStyle;
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
    paddingBottom: 20,
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3 * theme.margins.unit,
  },
  bottomText: {
    ...theme.fonts.regular,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
