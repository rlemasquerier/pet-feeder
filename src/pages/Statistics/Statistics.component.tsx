import React, { Component, ReactNode } from 'react';
import { Page, TopBanner, BarChart } from '../../components';

export class Statistics extends Component<{}, {}> {
  public render(): ReactNode {
    return (
      <Page>
        <TopBanner label="Statistiques" />
        <BarChart />
      </Page>
    );
  }
}
