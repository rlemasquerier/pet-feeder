import React, { Component, ReactNode } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { LargeButton } from '../../../../components';
import theme from './../../../../theme';

interface Props {
  onPress: () => void;
  status: 'active' | 'inactive' | 'invisible';
}

export class FeedPetButton extends Component<Props> {
  public render(): ReactNode {
    switch (this.props.status) {
      case 'active':
        return (
          <View style={styles.container}>
            <LargeButton
              label="NOURRIR GAÏA"
              color={theme.colors.secondary}
              onPress={this.props.onPress}
            />
          </View>
        );
      case 'inactive':
        return (
          <View style={styles.container}>
            <LargeButton
              label="GAÏA A ETE NOURRIE"
              color={theme.colors.secondary}
              onPress={this.props.onPress}
              disabled
            />
          </View>
        );
      default:
        return null;
    }
  }
}

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    marginVertical: 5 * theme.margins.unit,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});