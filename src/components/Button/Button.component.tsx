import React, { Component, ReactNode } from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import theme from './../../theme';

const BUTTON_HEIGHT = 50;
const BUTTON_ACTIVE_OPACITY = 0.8;

interface Props {
  label: string;
  onPress: () => void;
  isLoading: boolean;
}

export class Button extends Component<Props, {}> {
  public render(): ReactNode {
    const { label, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchable}
        activeOpacity={BUTTON_ACTIVE_OPACITY}
      >
        <View style={styles.container}>
          {this.props.isLoading ? <ActivityIndicator /> : <Text style={styles.text}>{label}</Text>}
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
