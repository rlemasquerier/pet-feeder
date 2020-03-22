import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { alpha, perspective } from './Constants';

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
  open: boolean;
}

export const Screen = ({ open, onPress }: ScreenProps) => {
  const rotateY = open ? `${-alpha}rad` : '0rad';
  const scale = open ? 0.9 : 1;
  const opacity = open ? 0.5 : 0;
  const borderRadius = open ? 20 : 0;
  return (
    <>
      <View
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
      </View>
      <View
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
