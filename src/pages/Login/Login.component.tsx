import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import theme from './../../theme';

export class Login extends Component<NavigationScreenProps, {}> {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Login Page</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
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
