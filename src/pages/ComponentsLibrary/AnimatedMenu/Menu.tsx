import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from './Screen';
import { Profile } from './Profile';

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
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Screen onPress={() => setOpen(true)} open={open} />
      <View style={styles.layer} pointerEvents="box-none">
        <Profile open={open} onPress={() => setOpen(false)} />
      </View>
    </View>
  );
};
