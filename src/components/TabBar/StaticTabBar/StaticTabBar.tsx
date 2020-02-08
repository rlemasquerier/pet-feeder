import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ViewStyle,
  Animated,
  Dimensions,
} from 'react-native';
import { Icon } from 'pet-feeder/src/components';
import { IconName } from '../../Icon/Icon.component';
import theme from 'pet-feeder/src/theme';

interface Tab {
  navigationRoute?: { key: string; routeName: string };
  iconName: IconName;
}

interface Props {
  height: number;
  tabs: Tab[];
  value: Animated.Value;
  circleBackgroundColor: string;
  onPressTab?: (index: number) => void;
}

const TAB_BAR_ICON_SIZE = 20;
const TAB_BAR_SELECTED_TAB_ICON_SIZE = 25;
const TAB_BAR_CIRCLE_SIZE = 50;
const TAB_BAR_SELECTED_TAB_VERTICAL_OFFSET = 10;

const { width } = Dimensions.get('window');

export const StaticTabBar: React.FC<Props> = (props: Props) => {
  const { tabs, value, height } = props;
  const tabWidth = width / tabs.length;
  const values = tabs.map((_, index) => new Animated.Value(index === 0 ? 1 : 0));

  const onPress = (index: number) => {
    props.onPressTab && props.onPressTab(index);
    Animated.sequence([
      Animated.parallel(
        values.map(v =>
          Animated.timing(v, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          })
        )
      ),
      Animated.parallel([
        Animated.spring(value, {
          toValue: -width + tabWidth * index,
          useNativeDriver: true,
          speed: 30,
        }),
        Animated.spring(values[index], {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const tabIconOpacity = value.interpolate({
          inputRange: [
            -width + tabWidth * (index - 1),
            -width + tabWidth * index,
            -width + tabWidth * (index + 1),
          ],
          outputRange: [1, 0, 1],
          extrapolate: 'clamp',
        });
        const translateY = values[index].interpolate({
          inputRange: [0, 1],
          outputRange: [64, 0],
          extrapolate: 'clamp',
        });
        const tabSelectionIconOpacity = values[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        return (
          <React.Fragment key={tab.iconName}>
            <Animated.View
              style={{
                position: 'absolute',
                width: tabWidth,
                height: height,
                left: index * tabWidth,
                top: -TAB_BAR_SELECTED_TAB_VERTICAL_OFFSET,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: tabSelectionIconOpacity,
                transform: [{ translateY }],
              }}
            >
              <View style={[styles.circle, { backgroundColor: props.circleBackgroundColor }]}>
                <Icon
                  name={tab.iconName}
                  size={TAB_BAR_SELECTED_TAB_ICON_SIZE}
                  color={theme.colors.border}
                />
              </View>
            </Animated.View>
            <TouchableWithoutFeedback key={tab.iconName} onPress={() => onPress(index)}>
              <Animated.View style={[styles.tab, { opacity: tabIconOpacity, height }]}>
                <Icon
                  name={tab.iconName}
                  size={TAB_BAR_ICON_SIZE}
                  color={theme.colors.backgroundColor}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </React.Fragment>
        );
      })}
    </View>
  );
};

interface Style {
  container: ViewStyle;
  tab: ViewStyle;
  circle: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: TAB_BAR_CIRCLE_SIZE,
    height: TAB_BAR_CIRCLE_SIZE,
    borderRadius: TAB_BAR_CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
