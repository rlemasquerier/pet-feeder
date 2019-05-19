import React, { Component, ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, View, ViewStyle, Text, TextStyle } from 'react-native';
import theme from './../../theme';

const BUTTON_SIZE = 76;
const BUTTON_ACTIVE_OPACITY = 0.7;

interface Props {
  label: string;
  color: string;
  onPress: () => void;
}

export class LargeButton extends Component<Props> {
  public render(): ReactNode {
    return (
      <TouchableOpacity activeOpacity={BUTTON_ACTIVE_OPACITY} onPress={this.props.onPress}>
        <View style={[styles.container, { backgroundColor: this.props.color }]}>
          <Text style={styles.label}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

interface Style {
  container: ViewStyle;
  label: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    height: BUTTON_SIZE,
    marginHorizontal: theme.margins.pagePadding,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.borders.shadow,
  },
  label: {
    ...theme.fonts.bigStrong,
    color: theme.colors.white,
  },
});
