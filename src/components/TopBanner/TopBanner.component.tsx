import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import theme from './../../theme';

const TOP_BANNER_HEIGHT = 50;

interface Props {
  label?: string;
}

export class TopBanner extends Component<Props> {
  public render(): ReactNode {
    if (!this.props.label) {
      return <View style={styles.topBanner}>{this.props.children}</View>;
    }
    return (
      <View style={styles.topBanner}>
        <Text style={styles.topBannerText}>{this.props.label}</Text>
      </View>
    );
  }
}

interface Style {
  topBanner: ViewStyle;
  topBannerText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  topBanner: {
    height: TOP_BANNER_HEIGHT,
    backgroundColor: theme.colors.banner,
    paddingHorizontal: 2 * theme.margins.unit,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBannerText: {
    ...theme.fonts.regular,
    color: theme.colors.white,
  },
});
