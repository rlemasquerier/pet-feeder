import React from 'react';
import { Text, StyleSheet, View, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { Page, TopBanner, LargeButton, Icon } from 'pet-feeder/src/components';
import { navigator } from 'pet-feeder/src/services/navigation';
import theme from 'pet-feeder/src/theme';

interface Props {}

export const CustomActions: React.FC<Props> = () => {
  return (
    <Page>
      <TopBanner>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigator.back()}>
          <Icon name="cheveron-left" size={35} color={theme.colors.white} />
        </TouchableOpacity>
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
