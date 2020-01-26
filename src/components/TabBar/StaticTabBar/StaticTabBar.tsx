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
  tabs: Tab[];
  value: Animated.Value;
}

const TAB_BAR_ICON_SIZE = 25;
const { width } = Dimensions.get('window');

export const StaticTabBar: React.FC<Props> = (props: Props) => {
  const { tabs, value } = props;
  const tabWidth = width / tabs.length;

  const onPress = (index: number) => {
    Animated.spring(value, {
      toValue: -width + tabWidth * index,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableWithoutFeedback key={tab.name} onPress={() => onPress(index)}>
          <View style={styles.tab}>
            <Icon name={tab.name} size={TAB_BAR_ICON_SIZE} color={'black'} />
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

interface Style {
  container: ViewStyle;
  tab: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
