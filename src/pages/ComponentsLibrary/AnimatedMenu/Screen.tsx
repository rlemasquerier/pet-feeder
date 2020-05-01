import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { alpha, perspective } from './Constants';
import Animated from 'react-native-reanimated';
import { bInterpolate } from 'react-native-redash';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#F6F5F9',
  },
  button: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});

interface ScreenProps {
  onPress: () => void;
  transition: Animated.Node<number>;
}

export const Screen = ({ transition, onPress }: ScreenProps) => {
  const rotateY = bInterpolate(transition, 0, -alpha);
  const scale = bInterpolate(transition, 1, 0.9);
  const opacity = bInterpolate(transition, 0, 0.5);
  const borderRadius = bInterpolate(transition, 0, 20);
  return (
    <>
      <Animated.View
        style={[
          styles.container,
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
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text style={styles.label}>Show Menu</Text>
          </View>
        </TouchableOpacity>
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
