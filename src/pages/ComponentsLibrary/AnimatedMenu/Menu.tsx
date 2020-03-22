import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from './Screen';
import { Profile } from './Profile';
import { Value } from 'react-native-reanimated';
import { withSpringTransition } from 'react-native-redash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
});

export const Menu = () => {
  const open = new Value<0 | 1>(0);
  const transition = withSpringTransition(open);
  return (
    <View style={styles.container}>
      <Screen onPress={() => open.setValue(1)} transition={transition} />
      <View style={styles.layer} pointerEvents="box-none">
        <Profile transition={transition} open={open} />
      </View>
    </View>
  );
};
