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
  not,
  interpolate,
  Clock,
  clockRunning,
  stopClock,
  divide,
} from 'react-native-reanimated';
import {
  bInterpolate,
  onGestureEvent,
  clamp,
  snapPoint,
  spring,
  timing,
} from 'react-native-redash';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const MIN = ((-4 * width) / Math.PI) * alpha;
const MAX = 0;
const MARGIN = 100;

interface ProfileProps {
  open: Animated.Value<0 | 1>;
  transition: Animated.Node<number>;
}

export const Profile = ({ open, transition: openingTransition }: ProfileProps) => {
  const clock = new Clock();
  const isDone = new Value(0);
  const transition = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const x = clamp(translationX, MIN, MAX + MARGIN);
  const velocityX = new Value(0);
  const gestureHandler = onGestureEvent({ state, translationX, velocityX });
  const gestureTransition = interpolate(x, {
    inputRange: [MIN, MAX],
    outputRange: [0, 1],
  });
  const snapTo = eq(snapPoint(x, velocityX, [MIN, MAX]), MAX);
  const isOpening = and(neq(diff(openingTransition), 0), open);
  useCode(
    () =>
      block([
        cond(isOpening, set(transition, openingTransition)),
        cond(eq(state, State.BEGAN), stopClock(clock)),
        cond(eq(state, State.ACTIVE), [set(isDone, 0), set(transition, gestureTransition)]),
        cond(and(eq(state, State.END), not(isDone)), [
          set(
            transition,
            cond(
              eq(snapTo, 1),
              spring({
                clock,
                velocity: divide(velocityX, -MIN),
                from: gestureTransition,
                to: 1,
              }),
              timing({ clock, from: gestureTransition, to: 0 })
            )
          ),
          cond(not(clockRunning(clock)), [set(isDone, 1), cond(eq(snapTo, 0), set(open, 0))]),
        ]),
      ]),
    [open, openingTransition, transition]
  );

  const translateX = bInterpolate(transition, MIN, MAX);
  const opacity = bInterpolate(transition, 0, 1);
  const rotateY = bInterpolate(transition, alpha, 0);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          opacity,
          transform: [
            perspective,
            { translateX },
            { translateX: -width / 2 },
            { rotateY },
            { translateX: width / 2 },
          ],
        }}
      >
        <Content />
      </Animated.View>
    </PanGestureHandler>
  );
};
