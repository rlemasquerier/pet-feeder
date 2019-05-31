import React, { Component, ReactNode } from 'react';
import { BarChart, Grid } from 'react-native-svg-charts';
import theme from './../../theme';

export class Statistics extends Component<{}, {}> {
  public render(): ReactNode {
    const fill = theme.colors.primary;
    const data = [50, 10, 40, 95];
    return (
      <BarChart
        style={{ height: 200 }}
        data={data}
        svg={{ fill }}
        contentInset={{ top: 30, bottom: 30 }}
      >
        <Grid />
      </BarChart>
    );
  }
}
