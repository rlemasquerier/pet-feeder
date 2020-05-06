import React from 'react';
import { TextStyle, StyleSheet, ViewStyle } from 'react-native';
import { default as RNCheckBox } from 'react-native-check-box';
import theme from './../../theme';

interface Props {
  onPress: () => void;
  color: string;
  isChecked: boolean;
  label: string;
}

export const CheckBox: React.FC<Props> = (props: Props) => {
  const { onPress, color, isChecked, label } = props;
  return (
    <RNCheckBox
      style={styles.container}
      onClick={onPress}
      checkBoxColor={color}
      isChecked={isChecked}
      leftTextStyle={styles.text}
      leftText={label}
    />
  );
};

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    paddingVertical: 2 * theme.margins.unit,
    borderBottomWidth: 1,
  },
  text: {
    color: theme.colors.text,
    marginRight: 4 * theme.margins.unit,
  },
});
