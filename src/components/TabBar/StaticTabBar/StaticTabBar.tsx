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

interface Tab {
  name: IconName;
}

interface Props {
  height: number;
  tabs: Tab[];
  value: Animated.Value;
}

const TAB_BAR_ICON_SIZE = 25;
const TAB_BAR_SELECTED_TAB_ICON_SIZE = 35;
const TAB_BAR_CIRCLE_SIZE = 50;
const TAB_BAR_SELECTED_TAB_BACKGROUND_COLOR = 'white';

const { width } = Dimensions.get('window');
const values = [0, 1, 2, 3].map(index => new Animated.Value(index === 0 ? 1 : 0));

export const StaticTabBar: React.FC<Props> = (props: Props) => {
  const { tabs, value, height } = props;
  const tabWidth = width / tabs.length;

  const onPress = (index: number) => {
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
        const opacity = value.interpolate({
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
        const opacity1 = values[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        return (
          <React.Fragment key={tab.name}>
            <Animated.View
              style={{
                position: 'absolute',
                width: tabWidth,
                height: height,
                left: index * tabWidth,
                top: -8,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: opacity1,
                transform: [{ translateY }],
              }}
            >
              <View style={styles.circle}>
                <Icon name={tab.name} size={TAB_BAR_SELECTED_TAB_ICON_SIZE} color={'black'} />
              </View>
            </Animated.View>
            <TouchableWithoutFeedback key={tab.name} onPress={() => onPress(index)}>
              <Animated.View style={[styles.tab, { opacity, height }]}>
                <Icon name={tab.name} size={TAB_BAR_ICON_SIZE} color={'black'} />
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
    backgroundColor: TAB_BAR_SELECTED_TAB_BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
