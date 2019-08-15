import React from 'react';
import { Text, TextStyle, StyleSheet, ViewStyle } from 'react-native';
import { Page } from 'pet-feeder/src/components';
import theme from 'pet-feeder/src/theme';

export const Signup: React.FC<null> = () => {
  return (
    <Page>
      <Text style={styles.text}>Texte</Text>
    </Page>
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
  },
  text: {
    ...theme.fonts.regular,
  },
});
