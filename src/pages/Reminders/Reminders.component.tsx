import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { RoundHeader } from '../../components';
import theme from './../../theme';

export class Reminders extends Component<{}, {}> {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <RoundHeader color={theme.colors.banner} height={150} ratio={0.8} />
        <Text style={styles.text}>Reminders</Text>
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
