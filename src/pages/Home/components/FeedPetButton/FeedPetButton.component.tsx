import React, { Component, ReactNode } from 'react';
import { View, ViewStyle, StyleSheet, Image, ImageStyle } from 'react-native';
import { LargeButton } from '../../../../components';
import theme from './../../../../theme';

const IMAGE_PLACEHOLDER_SIZE = 100;

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
        return (
          <View style={styles.container}>
            <Image source={theme.images.cheersGif} style={styles.imageStyle} resizeMode="stretch" />
          </View>
        );
    }
  }
}

interface Style {
  container: ViewStyle;
  imageStyle: ImageStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    marginVertical: 5 * theme.margins.unit,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  imageStyle: {
    alignSelf: 'center',
    height: IMAGE_PLACEHOLDER_SIZE,
    width: IMAGE_PLACEHOLDER_SIZE,
  },
});
