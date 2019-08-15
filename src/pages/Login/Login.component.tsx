import React, { Component, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, Image, ImageStyle, Text, TextStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Formik } from 'formik';
import { LoginForm } from './LoginForm';
import theme from '../../theme';

const initialValues = {
  email: '',
  password: '',
};

interface Values {
  email: string;
  password: string;
}

export interface Props {
  onPressLogin: (values: Values) => void;
}
export class Login extends Component<NavigationScreenProps & Props, {}> {
  public onSubmitForm = async (values: Values) => {
    this.props.onPressLogin(values);
  };
  public render(): ReactNode {
    return (
      <View style={styles.page}>
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
            <View style={styles.bottomContainer}>
              <Text
                style={styles.signupText}
                onPress={() => this.props.navigation.navigate('Signup')}
              >
                {"Pas encore de compte ? S'inscrire"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

interface Style {
  page: ViewStyle;
  container: ViewStyle;
  formContainer: ViewStyle;
  welcomeTextContainer: ViewStyle;
  image: ImageStyle;
  text: TextStyle;
  bottomContainer: ViewStyle;
  signupText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  page: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundColor,
  },
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
    width: '100%',
  },
  text: {
    ...theme.fonts.title,
    color: theme.colors.white,
  },
  bottomContainer: {
    flex: 1,
    padding: 2 * theme.margins.unit,
    marginTop: 4 * theme.margins.unit,
    alignItems: 'center',
  },
  signupText: {
    ...theme.fonts.strong,
  },
});
