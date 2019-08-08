import React, { Component, ReactNode } from 'react';
import { TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import firebase from 'react-native-firebase';
import { getUser } from '../../api/apiClient';
import theme from '../../theme';
import { User } from '../../types/types';
import { Loader as LoadingIndicator } from '../../components/Loader';

export interface Props {
  onLoginSuccess: (firebaseUid: string, email: string | null) => void;
  onUserDataSuccess: (user: User) => void;
}

export class Loader extends Component<NavigationScreenProps & Props, {}> {
  public async componentDidMount() {
    const credentials = firebase.auth().currentUser;
    if (credentials) {
      this.props.onLoginSuccess(credentials.uid, credentials.email);
      const userData = await getUser(credentials.uid);
      this.props.onUserDataSuccess(userData);
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Login');
    }
  }
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <LoadingIndicator size={100} />
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
