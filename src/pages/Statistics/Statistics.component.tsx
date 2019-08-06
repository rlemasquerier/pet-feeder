import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, ImageStyle, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';
import { RoundHeader, Page, BarChart } from '../../components';
import theme from './../../theme';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const HEADER = {
  EXTENDED_HEIGHT: 250,
  FOLDED_HEIGHT: 100,
  EXTENDED_ROUNDNESS_RATIO: 0.9,
  PROFILE_PICTURE: {
    EXTENDED_SIZE: 100,
    FOLDED_SIZE: 50,
    FOLDED_MARGIN_LEFT: 4 * theme.margins.unit,
  },
};

interface State {
  scrollY: Animated.Value<number>;
}

export class Statistics extends Component<{}, State> {
  public state = {
    scrollY: new Animated.Value(0),
  };
  public render(): ReactNode {
    const translateY = this.state.scrollY.interpolate({
      inputRange: [0, HEADER.EXTENDED_HEIGHT - HEADER.FOLDED_HEIGHT],
      outputRange: [0, -(HEADER.EXTENDED_HEIGHT - HEADER.FOLDED_HEIGHT)],
      extrapolate: Animated.Extrapolate.CLAMP,
    });
    const profileImageSize = this.state.scrollY.interpolate({
      inputRange: [0, HEADER.EXTENDED_HEIGHT - HEADER.FOLDED_HEIGHT],
      outputRange: [HEADER.PROFILE_PICTURE.EXTENDED_SIZE, HEADER.PROFILE_PICTURE.FOLDED_SIZE],
      extrapolate: Animated.Extrapolate.CLAMP,
    });
    const profileImageBorderRadius = this.state.scrollY.interpolate({
      inputRange: [0, HEADER.EXTENDED_HEIGHT - HEADER.FOLDED_HEIGHT],
      outputRange: [
        HEADER.PROFILE_PICTURE.EXTENDED_SIZE / 2,
        HEADER.PROFILE_PICTURE.FOLDED_SIZE / 2,
      ],
      extrapolate: Animated.Extrapolate.CLAMP,
    });
    const profileImageTranslateX = this.state.scrollY.interpolate({
      inputRange: [0, HEADER.EXTENDED_HEIGHT - HEADER.FOLDED_HEIGHT],
      outputRange: [
        0,
        -SCREEN_WIDTH / 2 +
          HEADER.PROFILE_PICTURE.FOLDED_SIZE / 2 +
          HEADER.PROFILE_PICTURE.FOLDED_MARGIN_LEFT,
      ],
      extrapolate: Animated.Extrapolate.CLAMP,
    });
    const profileImageTranslateY = this.state.scrollY.interpolate({
      inputRange: [0, HEADER.EXTENDED_HEIGHT - HEADER.FOLDED_HEIGHT],
      outputRange: [0, 6 * theme.margins.unit],
      extrapolate: Animated.Extrapolate.CLAMP,
    });
    return (
      <Page>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={onScroll({ y: this.state.scrollY })}
          contentContainerStyle={{ alignItems: 'center', paddingTop: HEADER.EXTENDED_HEIGHT }}
        >
          <BarChart />
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
          <Text style={styles.text}>Other stuffs</Text>
        </Animated.ScrollView>
        <RoundHeader
          color={theme.colors.banner}
          height={HEADER.EXTENDED_HEIGHT}
          ratio={HEADER.EXTENDED_ROUNDNESS_RATIO}
          title="Statistiques"
          translateY={translateY}
        >
          <Animated.Image
            // @ts-ignore
            style={[
              styles.profileImage,
              {
                borderRadius: profileImageBorderRadius,
                width: profileImageSize,
                height: profileImageSize,
                transform: [
                  { translateX: profileImageTranslateX, translateY: profileImageTranslateY },
                ],
              },
            ]}
            source={theme.images.profilePicturePlaceholder}
          />
          <Text style={styles.userNameText}>Jean-Mich</Text>
        </RoundHeader>
      </Page>
    );
  }
}

interface Style {
  profileImage: ImageStyle;
  text: TextStyle;
  pageNameText: TextStyle;
  userNameText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  profileImage: {
    resizeMode: 'cover',
  },
  text: {
    ...theme.fonts.regular,
    fontSize: 20,
    paddingVertical: 10,
  },
  pageNameText: {
    fontSize: 20,
    color: theme.colors.white,
  },
  userNameText: {
    ...theme.fonts.hugeStrong,
    marginVertical: 4 * theme.margins.unit,
    fontSize: 20,
    color: theme.colors.white,
  },
});
