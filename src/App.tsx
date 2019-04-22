import React from 'react';
import { View, Text } from 'react-native';

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Bienvenue chez BAM!</Text>
        <Text>Voici votre nouvelle application</Text>
      </View>
    );
  }
}
