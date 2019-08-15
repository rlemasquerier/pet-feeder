import React, { Component, ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, View, ViewStyle, Text, TextStyle } from 'react-native';
import { Loader } from '../Loader';
import theme from './../../theme';

const BUTTON_SIZE = 50;
const BUTTON_ACTIVE_OPACITY = 0.7;
const BUTTON_DISABLED_OPACITY = 0.5;

interface Props {
  label: string;
  color: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  loading?: boolean;
}

export class LargeButton extends Component<Props> {
  public render(): ReactNode {
    return (
      <View style={this.props.style}>
        <TouchableOpacity
          activeOpacity={BUTTON_ACTIVE_OPACITY}
          onPress={this.props.onPress}
          disabled={!!this.props.disabled || this.props.loading}
        >
          <View
            style={[
              styles.container,
              { backgroundColor: this.props.color },
              this.props.disabled && { opacity: BUTTON_DISABLED_OPACITY },
            ]}
          >
            {this.props.loading ? (
              <Loader size={20} />
            ) : (
              <Text style={styles.label}>{this.props.label}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
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
