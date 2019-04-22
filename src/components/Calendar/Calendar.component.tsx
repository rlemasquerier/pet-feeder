import React, { Component, ReactNode } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import { locale } from './utils/locale';

export class Calendar extends Component<{}, {}> {
  public render(): ReactNode {
    return (
      <CalendarStrip style={{ height: 100, paddingTop: 20, paddingBottom: 10 }} locale={locale} />
    );
  }
}
