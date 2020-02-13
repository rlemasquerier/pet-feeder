import React from 'react';
import { Text, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {}

export const CustomActions: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>Custom actions</Text>
    </View>
  );
};

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
