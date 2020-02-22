import React from 'react';
import { Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Page, TopBanner, LargeButton } from 'pet-feeder/src/components';
import theme from 'pet-feeder/src/theme';

interface Props {}

export const CustomActions: React.FC<Props> = () => {
  return (
    <Page>
      <TopBanner>
        <Text style={styles.topBannerText}>Autres Actions</Text>
      </TopBanner>
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
