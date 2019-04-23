import React, { Component, ReactNode } from 'react';
import { Text, View, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { Page, Card, Calendar } from '../../components';
import theme from '../../theme';

export class Home extends Component {
  public render(): ReactNode {
    return (
      <Page>
        <View style={styles.topBanner}>
          <Text style={styles.topBannerText}>Bonjour Rodolphe !</Text>
        </View>
        <View style={styles.content}>
          <Calendar />
          <Card title="Matin" content="Gaïa a été nourrie par Yoann !" />
          <Card title="Soir" content="La gamelle de Gaïa est vide !" />
        </View>
      </Page>
    );
  }
}

interface Style {
  content: ViewStyle;
  topBanner: ViewStyle;
  topBannerText: TextStyle;
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
    height: 50,
    backgroundColor: theme.colors.banner,
    paddingHorizontal: 2 * theme.margins.unit,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  topBannerText: {
    ...theme.fonts.regular,
    color: theme.colors.white,
  },
});
