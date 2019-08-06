import React, { Component, ReactNode } from 'react';
import { StyleSheet, ViewStyle, Dimensions, View, Text, TextStyle } from 'react-native';
import { computeHeaderRadius } from './utils';
import Animated from 'react-native-reanimated';
import theme from '../../theme';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface Props {
  color: string;
  height: number;
  ratio: number;
  translateY: Animated.Node<number>;
  children?: ReactNode;
  title?: string;
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
      <>
        <Animated.View
          // @ts-ignore
          style={[
            styles.roundHeader,
            this.getHeaderDynamicStyle(),
            { transform: [{ translateY: this.props.translateY }] },
          ]}
        >
          {this.props.children}
        </Animated.View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </>
    );
  }
}

interface Style {
  roundHeader: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Style>({
  title: {
    ...theme.fonts.big,
    color: theme.colors.white,
    position: 'absolute',
    top: 0,
  },
  titleContainer: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    width: '100%',
    backgroundColor: 'red',
  },
  roundHeader: {
    position: 'absolute',
    left: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
