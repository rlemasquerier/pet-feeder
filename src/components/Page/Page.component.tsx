import React, { Component, ReactNode } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import theme from './../../theme';

export class Page extends Component<{}, {}> {
  public render(): ReactNode {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.statusBar} />
        <SafeAreaView style={styles.container}>{this.props.children}</SafeAreaView>
      </>
    );
  }
}

interface Style {
  statusBar: ViewStyle;
  container: ViewStyle;
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
    backgroundColor: theme.colors.white,
  },
});
