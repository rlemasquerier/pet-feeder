import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ProfileDetails } from './ProfileDetails';
import { TribeMenu } from './TribeMenu';
import { Value } from 'react-native-reanimated';
import { withSpringTransition } from 'react-native-redash';
import { Page } from 'pet-feeder/src/components';
import theme from 'pet-feeder/src/theme';

export const Profile = () => {
  const open = new Value<0 | 1>(0);
  const transition = withSpringTransition(open);
  return (
    <Page>
      <View style={styles.container}>
        <ProfileDetails onPress={() => open.setValue(1)} transition={transition} />
        <View style={styles.layer} pointerEvents="box-none">
          <TribeMenu transition={transition} open={open} />
        </View>
      </View>
    </Page>
  );
};

interface Style {
  container: ViewStyle;
  layer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
});
