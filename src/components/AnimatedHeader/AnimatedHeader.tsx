import React from 'react';
import { Text, TextStyle, StyleSheet, ImageStyle, Dimensions, ImageURISource } from 'react-native';
import Animated from 'react-native-reanimated';
import { RoundHeader } from '../../components/RoundHeader';
import theme from './../../theme';

interface Props {
  scrollY: Animated.Value<number>;
  title: string;
  subtitle: string;
  imageSource: ImageURISource;
}

const SCREEN_WIDTH = Dimensions.get('screen').width;

export const HEADER_DIMENSIONS = {
  EXTENDED_HEIGHT: 250,
  FOLDED_HEIGHT: 100,
  EXTENDED_ROUNDNESS_RATIO: 0.9,
  PROFILE_PICTURE: {
    EXTENDED_SIZE: 100,
    FOLDED_SIZE: 50,
    FOLDED_MARGIN_LEFT: 4 * theme.margins.unit,
  },
};

export const AnimatedHeader: React.FC<Props> = (props: Props) => {
  const { scrollY, imageSource, title, subtitle } = props;
  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_DIMENSIONS.EXTENDED_HEIGHT - HEADER_DIMENSIONS.FOLDED_HEIGHT],
    outputRange: [0, -(HEADER_DIMENSIONS.EXTENDED_HEIGHT - HEADER_DIMENSIONS.FOLDED_HEIGHT)],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  const profileImageSize = scrollY.interpolate({
    inputRange: [0, HEADER_DIMENSIONS.EXTENDED_HEIGHT - HEADER_DIMENSIONS.FOLDED_HEIGHT],
    outputRange: [
      HEADER_DIMENSIONS.PROFILE_PICTURE.EXTENDED_SIZE,
      HEADER_DIMENSIONS.PROFILE_PICTURE.FOLDED_SIZE,
    ],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  const profileImageBorderRadius = scrollY.interpolate({
    inputRange: [0, HEADER_DIMENSIONS.EXTENDED_HEIGHT - HEADER_DIMENSIONS.FOLDED_HEIGHT],
    outputRange: [
      HEADER_DIMENSIONS.PROFILE_PICTURE.EXTENDED_SIZE / 2,
      HEADER_DIMENSIONS.PROFILE_PICTURE.FOLDED_SIZE / 2,
    ],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  const profileImageTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_DIMENSIONS.EXTENDED_HEIGHT - HEADER_DIMENSIONS.FOLDED_HEIGHT],
    outputRange: [
      0,
      -SCREEN_WIDTH / 2 +
        HEADER_DIMENSIONS.PROFILE_PICTURE.FOLDED_SIZE / 2 +
        HEADER_DIMENSIONS.PROFILE_PICTURE.FOLDED_MARGIN_LEFT,
    ],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  const profileImageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_DIMENSIONS.EXTENDED_HEIGHT - HEADER_DIMENSIONS.FOLDED_HEIGHT],
    outputRange: [0, 6 * theme.margins.unit],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  return (
    <RoundHeader
      color={theme.colors.banner}
      height={HEADER_DIMENSIONS.EXTENDED_HEIGHT}
      ratio={HEADER_DIMENSIONS.EXTENDED_ROUNDNESS_RATIO}
      title={title}
      translateY={translateY}
    >
      <Animated.Image
        style={[
          styles.profileImage,
          {
            borderRadius: profileImageBorderRadius,
            width: profileImageSize,
            height: profileImageSize,
            transform: [{ translateX: profileImageTranslateX, translateY: profileImageTranslateY }],
          },
        ]}
        source={imageSource}
      />
      <Text style={styles.userNameText}>{subtitle}</Text>
    </RoundHeader>
  );
};

interface Style {
  profileImage: ImageStyle;
  userNameText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  profileImage: {
    resizeMode: 'cover',
  },
  userNameText: {
    ...theme.fonts.hugeStrong,
    marginVertical: 4 * theme.margins.unit,
    fontSize: 20,
    color: theme.colors.white,
  },
});
