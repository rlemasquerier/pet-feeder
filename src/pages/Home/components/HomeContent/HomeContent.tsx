import React, { useState } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import moment, { Moment } from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar } from 'pet-feeder/src/components';
import { User } from 'pet-feeder/src/types';
import theme from 'pet-feeder/src/theme';
import { DayScrollView } from '../DayScrollView/DayScrollView.component';

interface Props {
  user: User;
}

export const HomeContent: React.FC<Props> = (props: Props) => {
  const { user } = props;
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const onDateChange = (date: Date) => {
    setSelectedDate(moment(date));
  };
  if (!user.tribeMember[0]) {
    return null;
  }
  return (
    <View style={styles.content}>
      <View style={styles.calendarContainer}>
        <Calendar selectedDate={selectedDate} onDateChange={onDateChange} />
      </View>
      <DayScrollView selectedDate={selectedDate} tribeId={user.tribeMember[0]} />
      <LinearGradient
        colors={['#F5F5F500', '#F5F5F580', '#F5F5F5FF']}
        style={{
          position: 'absolute',
          bottom: 0,
          height: 15,
          width: '100%',
        }}
      />
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
