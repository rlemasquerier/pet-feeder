import React from 'react';
import { alpha, perspective } from './Constants';
import { Content, width } from './Content';
import Animated, {
  Value,
  useCode,
  block,
  cond,
  and,
  neq,
  diff,
  set,
  eq,
  interpolate,
} from 'react-native-reanimated';
import { bInterpolate, onGestureEvent } from 'react-native-redash';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const MIN = ((-4 * width) / Math.PI) * alpha;
const MAX = 0;

interface ProfileProps {
  open: Animated.Value<0 | 1>;
  transition: Animated.Node<number>;
}

export const Profile = ({ open, transition: openingTransition }: ProfileProps) => {
  const transition = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const gestureHandler = onGestureEvent({ state, translationX, velocityX });
  const gestureTransition = interpolate(translationX, {
    inputRange: [MIN, MAX],
    outputRange: [0, 1],
  });
  useCode(
    () =>
      block([
        cond(and(open, neq(diff(openingTransition), 0)), set(transition, openingTransition)),
        cond(eq(state, State.ACTIVE), [set(transition, gestureTransition)]),
      ]),
    [open, openingTransition, transition]
  );

  const translateX = bInterpolate(transition, MIN, MAX);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          transform: [perspective, { translateX }],
        }}
      >
        <Content />
      </Animated.View>
    </PanGestureHandler>
  );
};
