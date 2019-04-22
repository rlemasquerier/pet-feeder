import React, { Component, ReactNode } from 'react';
import { Text, View, ViewStyle, StyleSheet } from 'react-native';

export class Home extends Component {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <Text>Welcome on Home</Text>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
