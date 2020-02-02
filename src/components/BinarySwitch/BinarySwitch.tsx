import React from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import theme from './../../theme';

interface Props {
  choice1: { label: string; value: string };
  choice2: { label: string; value: string };
  selectedValue: string;
  onValueChange?: (newValue: string) => void;
}

const borderStyle = {
  borderColor: theme.colors.border,
  borderRadius: theme.borders.radius,
};

export const BinarySwitch: React.FC<Props> = (props: Props) => {
  const { choice1, choice2, selectedValue, onValueChange } = props;
  const choice1Selected = choice1.value === selectedValue;
  const choice2Selected = choice2.value === selectedValue;
  const onPress = () => {
    if (onValueChange) {
      if (choice1Selected) {
        onValueChange(choice2.value);
      } else if (choice2Selected) {
        onValueChange(choice1.value);
      }
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.itemContainer,
          {
            ...borderStyle,
            borderRightWidth: 1,
          },
          choice1Selected && { backgroundColor: theme.colors.primary },
        ]}
      >
        <Text style={[styles.text]}>{choice1.label}</Text>
      </View>
      <View
        style={[styles.itemContainer, choice2Selected && { backgroundColor: theme.colors.primary }]}
      >
        <Text style={styles.text}>{choice2.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface Style {
  container: ViewStyle;
  itemContainer: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    ...borderStyle,
  },
  itemContainer: {
    padding: 3 * theme.margins.unit,
  },
  text: {
    ...theme.fonts.regular,
  },
});
