import React, { useState } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import moment, { Moment } from 'moment';
import { Calendar } from 'pet-feeder/src/components';
import { User } from 'pet-feeder/src/types';
import theme from 'pet-feeder/src/theme';
import { DayScrollView } from '../DayScrollView/DayScrollView.component';

interface Props {
  user: User;
}

interface State {
  selectedDate: Moment;
}

export const HomeContent: React.FC<Props> = (props: Props) => {
  const { user } = props;
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const onDateChange = (date: Date) => {
    setSelectedDate(moment(date));
  };
  return (
    <View style={styles.content}>
      <View style={styles.calendarContainer}>
        <Calendar selectedDate={selectedDate} onDateChange={onDateChange} />
      </View>
      <DayScrollView selectedDate={selectedDate} tribeId={user.tribeMember[0]} />
    </View>
  );
};

interface Style {
  content: ViewStyle;
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
  calendarContainer: {
    paddingHorizontal: 4 * theme.margins.unit,
  },
});
