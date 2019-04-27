import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { LoginForm } from './LoginForm';
import { Page } from '../../components';
import theme from './../../theme';

export class Login extends Component<NavigationScreenProps, {}> {
  public render(): ReactNode {
    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.text}>Login Page</Text>
          <LoginForm />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </Page>
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
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    ...theme.fonts.regular,
  },
});
