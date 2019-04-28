import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, TouchableOpacity, StyleSheet, View, ViewStyle } from 'react-native';
import theme from './../../theme';

const BUTTON_HEIGHT = 50;

interface Props {
  label: string;
  onPress: () => void;
}

export class Button extends Component<Props, {}> {
  public render(): ReactNode {
    const { label, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <View style={styles.container}>
          <Text style={styles.text}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

interface Style {
  container: ViewStyle;
  text: TextStyle;
  touchable: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  touchable: {
    width: '70%',
  },
  container: {
    height: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.banner,
  },
  text: {
    ...theme.fonts.regular,
    color: theme.colors.white,
  },
});
