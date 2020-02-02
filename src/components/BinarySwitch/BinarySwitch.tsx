import React from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import theme from './../../theme';
import { withFormikControl } from 'react-native-formik';

interface Props {
  choice1: { label: string; value: string };
  choice2: { label: string; value: string };
  value: string;
  setFieldValue?: (value: string) => void;
}

const borderStyle = {
  borderColor: theme.colors.border,
  borderRadius: theme.borders.radius,
};

export const _BinarySwitch: React.FC<Props> = (props: Props) => {
  const { choice1, choice2, value, setFieldValue } = props;
  const choice1Selected = choice1.value === value;
  const choice2Selected = choice2.value === value;
  const onPress = () => {
    if (setFieldValue) {
      if (choice1Selected) {
        setFieldValue(choice2.value);
      } else if (choice2Selected) {
        setFieldValue(choice1.value);
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

export const BinarySwitch = withFormikControl(_BinarySwitch);

interface Style {
  container: ViewStyle;
  itemContainer: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    width: '70%',
    ...borderStyle,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3 * theme.margins.unit,
  },
  text: {
    ...theme.fonts.regular,
  },
});
