import React from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon } from '../Icon';
import theme from './../../theme';

interface Props {}

export const GenericError: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Icon name="wondering2" size={70} color={theme.colors.placeholderColor} />
      <Text style={styles.text}>Une erreur est survenue</Text>
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
    ...theme.fonts.huge,
    marginTop: 4 * theme.margins.unit,
    color: theme.colors.text,
  },
});
