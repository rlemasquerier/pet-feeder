import React, { Component, ReactNode } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  Dimensions,
  Image,
  ImageStyle,
  Text,
  TextStyle,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Formik } from 'formik';
import { LoginForm } from './LoginForm';
import { KeyboardAvoidingView, FiguresDisplay } from 'pet-feeder/src/components/';
import theme from '../../theme';
import { PAGES } from 'pet-feeder/src/services/navigation';

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
      <KeyboardAvoidingView style={styles.page}>
        <Image source={theme.images.loginBackground} style={styles.image} resizeMode="stretch" />
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.text}>Bonjour !</Text>
        </View>
        <View />
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Formik
              onSubmit={this.onSubmitForm}
              initialValues={initialValues}
              component={LoginForm}
            />
            <View style={styles.bottomContainer}>
              <Text
                style={styles.signupText}
                onPress={() => this.props.navigation.navigate(PAGES.SIGNUP)}
              >
                {"Pas encore de compte ? S'inscrire"}
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.backgroundColor,
    height: '100%',
  },
  container: {
    flex: 0.5,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  formContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  welcomeTextContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.2,
    marginLeft: 5 * theme.margins.unit,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image: {
    flex: 0.5,
    width: '100%',
  },
  text: {
    ...theme.fonts.title,
    color: theme.colors.white,
  },
  bottomContainer: {
    padding: 2 * theme.margins.unit,
    alignItems: 'center',
  },
  signupText: {
    ...theme.fonts.strong,
    textAlign: 'center',
  },
});
