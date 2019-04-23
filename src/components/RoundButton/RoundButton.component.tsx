import React, { Component, ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon } from '../Icon';
import theme from './../../theme';

const ICON_SIZE = 35;
const BUTTON_SIZE = 76;

interface Props {
  iconName: string;
  color: string;
  iconColor: string;
}

export class RoundButton extends Component<Props> {
  public render(): ReactNode {
    return (
      <TouchableOpacity>
        <View style={[styles.container, { backgroundColor: this.props.color }]}>
          <Icon name={this.props.iconName} size={ICON_SIZE} color={this.props.iconColor} />
        </View>
      </TouchableOpacity>
    );
  }
}

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.borders.shadow,
  },
});
