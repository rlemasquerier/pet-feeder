import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Page, LargeButton, Header } from 'pet-feeder/src/components';
import theme from 'pet-feeder/src/theme';

interface Props {}

export const CustomActions: React.FC<Props> = () => {
  return (
    <Page>
      <Header title="Autres actions" />
      <View style={styles.container}>
        <LargeButton
          label={'Litière'.toUpperCase()}
          color={theme.colors.secondary}
          onPress={() => {}}
        />
      </View>
    </Page>
  );
};

interface Style {
  container: ViewStyle;
  topBannerText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topBannerText: {
    ...theme.fonts.regular,
    color: theme.colors.white,
  },
});
