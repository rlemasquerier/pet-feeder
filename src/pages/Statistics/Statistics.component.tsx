import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, ImageStyle, Dimensions, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';
import { RoundHeader, Page, BarChart, FiguresDisplay } from '../../components';
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
    const figuresDisplayData = [
      { label: 'Repas', value: 38 },
      { label: 'Matins', value: 2 },
      { label: 'Soirs', value: 56 },
    ];

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
          contentContainerStyle={styles.content}
        >
          <FiguresDisplay data={figuresDisplayData} />
          <View style={styles.cardStyle}>
            <BarChart />
          </View>
          <FiguresDisplay
            data={[
              ...figuresDisplayData,
              { value: 12, label: 'Test' },
              { value: 3, label: 'Very long' },
            ]}
          />
          <FiguresDisplay data={figuresDisplayData} />
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
            source={{
              uri:
                'https://s3.eu-west-3.amazonaws.com/pet-feeder-resources.tech/1565210603565+-+IMG_2818_small.jpg',
            }}
          />
          <Text style={styles.userNameText}>Jean-Mich</Text>
        </RoundHeader>
      </Page>
    );
  }
}

interface Style {
  profileImage: ImageStyle;
  userNameText: TextStyle;
  content: ViewStyle;
  cardStyle: ViewStyle;
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
  content: {
    alignItems: 'stretch',
    paddingTop: HEADER.EXTENDED_HEIGHT,
    paddingBottom: 4 * theme.margins.unit,
    paddingHorizontal: theme.margins.pagePadding,
  },
  cardStyle: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.border,
    marginTop: 4 * theme.margins.unit,
    paddingHorizontal: 4 * theme.margins.unit,
    paddingVertical: 2 * theme.margins.unit,
  },
});
