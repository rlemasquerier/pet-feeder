import React, { useState } from 'react';
import { Text, TextStyle, StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';
import { Page, Loader } from '../../components';
import {
  AnimatedHeader,
  HEADER_DIMENSIONS,
} from 'pet-feeder/src/components/AnimatedHeader/AnimatedHeader';
import theme from './../../theme';
import { useCurrentUser } from 'pet-feeder/src/hooks';

interface State {
  scrollY: Animated.Value<number>;
}

export const Reminders: React.FC<{}> = () => {
  const [scrollY] = useState<Animated.Value<number>>(new Animated.Value(0));
  const { user } = useCurrentUser();
  if (!user) {
    return <Loader size={100} />;
  }
  return (
    <Page>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll({ y: scrollY })}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.text}>Content</Text>
      </Animated.ScrollView>
      <AnimatedHeader
        scrollY={scrollY}
        title="Rappels"
        subtitle={user.name}
        imageSource={
          user && user.profilePictureUrl
            ? {
                uri: user.profilePictureUrl,
              }
            : theme.images.profilePicturePlaceholder
        }
      />
    </Page>
  );
};

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    alignItems: 'stretch',
    paddingTop: HEADER_DIMENSIONS.EXTENDED_HEIGHT,
    paddingBottom: 4 * theme.margins.unit,
    paddingHorizontal: theme.margins.pagePadding,
  },
  text: {
    ...theme.fonts.regular,
    fontSize: 20,
    paddingVertical: 10,
  },
});
