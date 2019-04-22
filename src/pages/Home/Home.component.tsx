import React, { Component, ReactNode } from 'react';
import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  TextStyle,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Card } from '../../components';
import theme from '../../theme';

export class Home extends Component {
  public render(): ReactNode {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.statusBar} />
        <SafeAreaView style={styles.container}>
          <View style={styles.topBanner}>
            <Text style={styles.topBannerText}>Bonjour Rodolphe !</Text>
          </View>
          <View style={styles.content}>
            <Card title="Matin" content="Gaïa a été nourrie par Yoann !" />
            <Card title="Soir" content="La gamelle de Gaïa est vide !" />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

interface Style {
  statusBar: ViewStyle;
  container: ViewStyle;
  content: ViewStyle;
  topBanner: ViewStyle;
  topBannerText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  statusBar: {
    flex: 0,
    backgroundColor: theme.colors.banner,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
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
