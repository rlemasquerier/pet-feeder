import React, { Component, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LottieAnimation } from '../LottieAnimation';
import theme from '../../theme';

interface Props {
  size: number;
}

export class Loader extends Component<Props, {}> {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <LottieAnimation name={theme.animations.loader} size={this.props.size} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
