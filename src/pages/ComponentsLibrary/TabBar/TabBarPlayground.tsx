import React from 'react';
import { View } from 'react-native';
import { TabBar } from 'pet-feeder/src/components';
import theme from 'pet-feeder/src/theme';

interface Props {}

export const TabBarPlayground: React.FC<Props> = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TabBar
        height={64}
        backgroundColor={theme.colors.banner}
        iconNames={['home3', 'bell', 'calendar', 'user']}
      />
    </View>
  );
};
