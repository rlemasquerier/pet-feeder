import React, { Component, ReactNode } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import theme from './../../theme';

interface Props {
  statusBarColor?: string;
}

export class Page extends Component<Props, {}> {
  public render(): ReactNode {
    const statusBarColor = this.props.statusBarColor;
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView
          style={[
            styles.statusBar,
            !!statusBarColor && { backgroundColor: this.props.statusBarColor },
          ]}
        />
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
    justifyContent: 'space-between',
    backgroundColor: theme.colors.backgroundColor,
  },
});
