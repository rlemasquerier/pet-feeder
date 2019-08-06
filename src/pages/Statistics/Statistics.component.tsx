import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';
import { RoundHeader, Page, BarChart } from '../../components';
import theme from './../../theme';

const HEADER = {
  EXTENDED_HEIGHT: 250,
  FOLDED_HEIGHT: 150,
  EXTENDED_ROUNDNESS_RATIO: 0.9,
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
      inputRange: [0, HEADER.FOLDED_HEIGHT],
      outputRange: [0, -HEADER.FOLDED_HEIGHT],
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
          translateY={translateY}
        />
      </Page>
    );
  }
}

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    ...theme.fonts.regular,
    fontSize: 20,
    paddingVertical: 10,
  },
});
