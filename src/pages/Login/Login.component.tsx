import React, { Component, ReactNode } from 'react';
import { TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Formik } from 'formik';
import { LoginForm } from './LoginForm';
import { Page } from '../../components';
import theme from './../../theme';

const initialValues = {
  email: '',
  password: '',
};

interface Values {
  email: string;
  password: string;
}
export class Login extends Component<NavigationScreenProps, {}> {
  public onSubmitForm = (values: Values) => {
    console.log(values);
    this.props.navigation.navigate('Home');
  };
  public render(): ReactNode {
    return (
      <Page>
        <View style={styles.container}>
          <Formik
            onSubmit={this.onSubmitForm}
            initialValues={initialValues}
            component={LoginForm}
          />
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
