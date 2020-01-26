import React from 'react';
import { TextStyle, StyleSheet, ViewStyle, Dimensions, View } from 'react-native';
import * as shape from 'd3-shape';
import theme from './../../theme';
import { Svg, Path } from 'react-native-svg';

interface Props {}

const tabs = [
  {
    name: 'home',
  },
  {
    name: 'stats',
  },
  {
    name: 'reminders',
  },
  {
    name: 'profile',
  },
];
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
  return (
    <View style={styles.container}>
      <Svg width={width * 2} height={height}>
        <Path {...{ d }} fill="red" />
      </Svg>
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
