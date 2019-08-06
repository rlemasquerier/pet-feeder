import React, { Component, ReactNode } from 'react';
import { StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { computeHeaderRadius } from './utils';
import Animated from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface Props {
  color: string;
  height: number;
  ratio: number;
  translateY: Animated.Node<number>;
}

export class RoundHeader extends Component<Props, {}> {
  public getHeaderDynamicStyle = () => {
    const headerRadius = computeHeaderRadius(this.props.ratio, this.props.height, SCREEN_WIDTH);
    const headerWidth = headerRadius * 2;
    return {
      top: this.props.height - headerWidth,
      marginLeft: -headerWidth / 2,
      height: headerWidth,
      width: headerWidth,
      borderRadius: headerWidth / 2,
      backgroundColor: this.props.color,
    };
  };
  public render(): ReactNode {
    return (
      <Animated.View
        // @ts-ignore
        style={[
          styles.roundHeader,
          this.getHeaderDynamicStyle(),
          { transform: [{ translateY: this.props.translateY }] },
        ]}
      />
    );
  }
}

interface Style {
  roundHeader: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  roundHeader: {
    position: 'absolute',
    left: '50%',
  },
});
