import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle, ActivityIndicator } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import firebase from 'react-native-firebase';
import theme from '../../theme';

export class Loader extends Component<NavigationScreenProps, {}> {
  public componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'Login');
    });
  }
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...theme.fonts.regular,
  },
});
