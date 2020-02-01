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

const { width } = Dimensions.get('window');
const tabWidth = width / tabs.length;
const height = 64;
const left = shape
  .line()
  .x(d => d[0])
  .y(d => d[1])([[0, 0], [width, 0]]);

const tab = shape
  .line()
  .x(d => d[0])
  .y(d => d[1])
  .curve(shape.curveBasis)([
  [width, 0],
  [width + 5, 0],
  [width + 10, 10],
  [width + 15, height],
  [width + tabWidth - 15, height],
  [width + tabWidth - 10, 10],
  [width + tabWidth - 5, 0],
  [width + tabWidth, 0],
]);

const right = shape
  .line()
  .x(d => d[0])
  .y(d => d[1])([[width + tabWidth, 0], [width * 2, 0], [width * 2, height], [0, height], [0, 0]]);

const d = `${left} ${tab} ${right}`;

export const TabBar: React.FC<Props> = () => {
  const value = new Animated.Value(-width);
  return (
    <View style={styles.container}>
      <View style={{ height, width }}>
        <AnimatedSvg
          width={width * 2}
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
