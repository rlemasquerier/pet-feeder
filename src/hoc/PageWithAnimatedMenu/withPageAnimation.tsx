import React from 'react';
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import { alpha, perspective } from './Constants';
import Animated from 'react-native-reanimated';
import { bInterpolate } from 'react-native-redash';

const { width } = Dimensions.get('window');

interface WrappedComponentProps {
  onPress: () => void;
}

export interface HOCProps {
  onPress: () => void;
  transition: Animated.Node<number>;
  containerStyle: ViewStyle;
}

export const withPageAnimation = (WrappedComponent: React.FC<WrappedComponentProps>) => {
  const HOC = ({ transition, onPress, containerStyle, ...props }: HOCProps) => {
    const rotateY = bInterpolate(transition, 0, -alpha);
    const scale = bInterpolate(transition, 1, 0.9);
    const opacity = bInterpolate(transition, 0, 0.5);
    const borderRadius = bInterpolate(transition, 0, 20);
    return (
      <>
        <Animated.View
          style={[
            containerStyle,
            {
              borderRadius,
              transform: [
                perspective,
                { translateX: width / 2 },
                { rotateY },
                { translateX: -width / 2 },
                { scale },
              ],
            },
          ]}
        >
          <WrappedComponent {...props} onPress={onPress} />
        </Animated.View>
        <Animated.View
          pointerEvents="none"
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'black',
            opacity,
          }}
        />
      </>
    );
  };

  return HOC;
};
