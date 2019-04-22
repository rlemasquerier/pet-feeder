import React, { Component, ReactNode } from 'react';
import { Text, View, ViewStyle, StyleSheet } from 'react-native';
import { Card } from '../../components';

export class Home extends Component {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <Text>Welcome on Home</Text>
        <Card title="Matin" content="Gaïa a été nourrie par Yoann !" />
        <Card title="Soir" content="La gamelle de Gaïa est vide !" />
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
    paddingHorizontal: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
