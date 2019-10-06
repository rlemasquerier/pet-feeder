import React from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import theme from './../../theme';

const CHARACTER_CONTAINER_WIDTH = 40;

interface Props {
  code: string;
}

export const TribeCode: React.FC<Props> = (props: Props) => {
  const { code } = props;
  return (
    <View style={styles.container}>
      {code.split('').map((character, index) => (
        <View
          key={index}
          style={[{ width: CHARACTER_CONTAINER_WIDTH }, index > 0 && { borderLeftWidth: 1 }]}
        >
          <Text style={styles.codeText}>{character}</Text>
        </View>
      ))}
    </View>
  );
};

interface Style {
  container: ViewStyle;
  codeText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 3,
    borderWidth: 1,
  },
  codeText: {
    ...theme.fonts.code,
    textAlign: 'center',
  },
});
