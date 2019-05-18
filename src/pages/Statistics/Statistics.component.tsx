import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import theme from './../../theme';

export class Statistics extends Component<{}, {}> {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Statistics</Text>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...theme.fonts.regular,
  },
});
