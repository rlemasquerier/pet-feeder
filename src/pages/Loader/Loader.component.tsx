import React, { Component, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Loader as LoadingIndicator } from '../../components/Loader';
import { PAGES } from 'pet-feeder/src/AppNavigator';

export interface Props {
  accessToken?: string;
}

export class Loader extends Component<NavigationScreenProps & Props, {}> {
  public componentDidMount() {
    if (this.props.accessToken) {
      this.props.navigation.navigate(PAGES.HOME);
    } else {
      this.props.navigation.navigate(PAGES.LOGIN);
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
