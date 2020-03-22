import React from 'react';
import { alpha, perspective } from './Constants';
import { Content, width } from './Content';
import Animated from 'react-native-reanimated';
import { bInterpolate } from 'react-native-redash';

const MIN = ((-4 * width) / Math.PI) * alpha;
const MAX = 0;

interface ProfileProps {
  open: Animated.Value<0 | 1>;
  transition: Animated.Node<number>;
}

export const Profile = ({ transition }: ProfileProps) => {
  const translateX = bInterpolate(transition, MIN, MAX);
  return (
    <Animated.View
      style={{
        transform: [perspective, { translateX }],
      }}
    >
      <Content />
    </Animated.View>
  );
};
