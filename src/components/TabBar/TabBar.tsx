import React from 'react';
import { TextStyle, StyleSheet, ViewStyle, Dimensions, View, Animated } from 'react-native';
import * as shape from 'd3-shape';
import { Svg, Path } from 'react-native-svg';
import theme from './../../theme';
import { StaticTabBar } from './StaticTabBar';
import { IconName } from '../Icon/Icon.component';

interface Props {}

const tabs: { name: IconName }[] = [
  {
    name: 'home3',
  },
  {
    name: 'bell',
  },
  {
    name: 'calendar',
  },
  {
    name: 'user',
  },
];

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const { width: screenWidth } = Dimensions.get('window');
const tabWidth = screenWidth / tabs.length;
const height = 64;
const extraMargin = 100; // Need this because of spring effect
const left = shape
  .line()
  .x(d => d[0])
  .y(d => d[1])([[0, 0], [screenWidth - 15, 0]]);

const tab = shape
  .line()
  .x(d => d[0])
  .y(d => d[1])
  .curve(shape.curveBasis)([
  [screenWidth - 15, 0],
  [screenWidth - 10, 0],
  [screenWidth + 10, 10],
  [screenWidth + 20, height],
  [screenWidth + tabWidth - 20, height],
  [screenWidth + tabWidth - 10, 10],
  [screenWidth + tabWidth + 10, 0],
  [screenWidth + tabWidth + 15, 0],
]);

const right = shape
  .line()
  .x(d => d[0])
  .y(d => d[1])([
  [screenWidth + tabWidth + 15, 0],
  [screenWidth * 2 + extraMargin, 0],
  [screenWidth * 2 + extraMargin, height],
  [0, height],
  [0, 0],
]);

const d = `${left} ${tab} ${right}`;

export const TabBar: React.FC<Props> = () => {
  const value = new Animated.Value(-screenWidth);
  return (
    <View style={styles.container}>
      <View style={{ height, width: screenWidth }}>
        <AnimatedSvg
          width={screenWidth * 2 + extraMargin}
          height={height}
          style={{ transform: [{ translateX: value }] }}
        >
          <Path {...{ d }} fill="red" />
        </AnimatedSvg>
        <View style={StyleSheet.absoluteFill}>
          <StaticTabBar tabs={tabs} value={value} height={height} />
        </View>
      </View>
    </View>
  );
};

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  text: {
    ...theme.fonts.regular,
  },
});
