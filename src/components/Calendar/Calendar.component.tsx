import React, { Component, ReactNode } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import theme from '../../theme';
import { locale } from './utils/locale';

export class Calendar extends Component<{}, {}> {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <CalendarStrip style={styles.calendar} locale={locale} />
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
    backgroundColor: theme.colors.white,
    ...theme.borders.shadow,
  },
  calendar: {
    overflow: 'hidden',
    backgroundColor: theme.colors.white,
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
  },
});
