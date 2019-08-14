import React, { Component, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Loader as LoadingIndicator } from '../../components/Loader';

export interface Props {
  accessToken?: string;
}

export class Loader extends Component<NavigationScreenProps & Props, {}> {
  public componentDidMount() {
    if (this.props.accessToken) {
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
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
