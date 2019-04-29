import React, { Component, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, Image, ImageStyle, Text, TextStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Formik } from 'formik';
import firebase from 'react-native-firebase';
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
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        console.log('success');
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
      });
  };
  public render(): ReactNode {
    return (
      <>
        <Page>
          <Image source={theme.images.loginBackground} style={styles.image} resizeMode="stretch" />
          <View style={styles.container}>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.text}>Bonjour !</Text>
            </View>
            <View style={styles.formContainer}>
              <Formik
                onSubmit={this.onSubmitForm}
                initialValues={initialValues}
                component={LoginForm}
              />
            </View>
          </View>
        </Page>
      </>
    );
  }
}

interface Style {
  container: ViewStyle;
  formContainer: ViewStyle;
  welcomeTextContainer: ViewStyle;
  image: ImageStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  welcomeTextContainer: {
    flex: 1,
    marginLeft: 5 * theme.margins.unit,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '50%',
  },
  text: {
    ...theme.fonts.title,
    color: theme.colors.white,
  },
});
