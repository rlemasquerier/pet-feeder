import React from 'react';
import {
  TextStyle,
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  Dimensions,
  View,
  Animated,
} from 'react-native';
import * as shape from 'd3-shape';
import { Svg, Path } from 'react-native-svg';
import theme from './../../theme';
import { StaticTabBar } from './StaticTabBar';
import { IconName } from '../Icon/Icon.component';

type Props = Partial<ReactNavigationBottomTabBarProps> & {
  backgroundColor: string;
  iconNames: IconName[];
};

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const { width: screenWidth } = Dimensions.get('window');
const height = 64;
const extraMargin = 100; // Need this because of spring effect

export const _TabBar: React.FC<Props> = (props: Props) => {
  const value = new Animated.Value(-screenWidth);
  const tabWidth = screenWidth / props.iconNames.length;
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
  return (
    <>
      <View style={styles.container}>
        <View style={{ height, width: screenWidth }}>
          <AnimatedSvg
            width={screenWidth * 2 + extraMargin}
            height={height}
            style={{ transform: [{ translateX: value }] }}
          >
            <Path {...{ d }} fill={props.backgroundColor} />
          </AnimatedSvg>
          <View style={StyleSheet.absoluteFill}>
            <StaticTabBar
              tabs={props.iconNames.map((iconName: IconName, index: number) => {
                return {
                  iconName: iconName,
                  navigationRoute:
                    props.navigation &&
                    props.navigation.state &&
                    props.navigation.state.routes[index],
                };
              })}
              value={value}
              height={height}
              circleBackgroundColor={props.backgroundColor}
              onPressTab={
                props.onTabPress &&
                ((index: number) => {
                  props.onTabPress({ route: props.navigation.state.routes[index] });
                })
              }
            />
          </View>
        </View>
      </View>
      <SafeAreaView style={{ backgroundColor: props.backgroundColor }} />
    </>
  );
};

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundColor,
  },
  text: {
    ...theme.fonts.regular,
  },
});

export const TabBar = React.memo(_TabBar, () => true);
