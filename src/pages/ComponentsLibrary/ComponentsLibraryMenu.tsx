import React from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import theme from '../../theme';
import { navigator, PAGES } from 'pet-feeder/src/services/navigation';

export const ComponentsLibraryMenu: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => navigator.navigate(PAGES.TAB_BAR_PLAYGROUND)}>
        Tab Bar
      </Text>
      <Text style={styles.text} onPress={() => navigator.navigate(PAGES.BINARY_SWITCH_PLAYGROUND)}>
        Binary Switch
      </Text>
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
  },
  text: {
    ...theme.fonts.regular,
  },
});
