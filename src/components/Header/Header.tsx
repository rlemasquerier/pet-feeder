import React from 'react';
import { Text, TextStyle, StyleSheet, ViewStyle, View, TouchableOpacity } from 'react-native';
import theme from '../../theme';
import { TopBanner, Icon } from 'pet-feeder/src/components';
import { navigator } from 'pet-feeder/src/services/navigation';

interface Props {
  title: string;
}

const BACK_ICON_SIZE = 35;

export const Header: React.FC<Props> = (props: Props) => {
  return (
    <TopBanner>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigator.back()}>
        <Icon name="cheveron-left" size={BACK_ICON_SIZE} color={theme.colors.white} />
      </TouchableOpacity>
      <Text style={styles.topBannerText}>{props.title}</Text>
      <View style={{ width: BACK_ICON_SIZE }} />
    </TopBanner>
  );
};

interface Style {
  container: ViewStyle;
  topBannerText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topBannerText: {
    ...theme.fonts.regular,
    color: theme.colors.white,
  },
});
