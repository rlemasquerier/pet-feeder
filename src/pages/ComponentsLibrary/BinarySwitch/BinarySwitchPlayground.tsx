import React, { useState } from 'react';
import { TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import theme from 'pet-feeder/src/theme';
import { BinarySwitch } from 'pet-feeder/src/components';

interface Props {}

export const BinarySwitchPlayground: React.FC<Props> = () => {
  const [value, setValue] = useState('choice1');
  return (
    <View style={styles.container}>
      <BinarySwitch
        choice1={{ label: 'Choice 1', value: 'choice1' }}
        choice2={{ label: 'Choice 2', value: 'choice2' }}
        value={value}
        setFieldValue={newValue => setValue(newValue)}
        name="BinarySwitch"
        type="switch"
      />
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
