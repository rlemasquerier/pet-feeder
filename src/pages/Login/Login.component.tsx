import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { LoginForm } from './LoginForm';
import { Page } from '../../components';
import theme from './../../theme';

export class Login extends Component<NavigationScreenProps, {}> {
  public onSubmitForm = () => {
    this.props.navigation.navigate('Home');
  };
  public render(): ReactNode {
    return (
      <Page>
        <View style={styles.container}>
          <LoginForm onSubmit={this.onSubmitForm} />
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
