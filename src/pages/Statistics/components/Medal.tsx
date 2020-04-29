import React from 'react';
import { StyleSheet, View, ViewStyle, Image, ImageStyle } from 'react-native';
import theme from 'pet-feeder/src/theme';

interface Props {
  rank: number;
}

const MEDAL_SIZE = 40;
const TOP_OFFSET = -15;

const MedalImage = (props: { rank: number }) => {
  const { rank } = props;
  switch (rank) {
    case 1:
      return <Image source={theme.images.goldMedal} resizeMode="contain" style={styles.image} />;
    case 2:
      return <Image source={theme.images.silverMedal} resizeMode="contain" style={styles.image} />;
    case 3:
      return <Image source={theme.images.bronzeMedal} resizeMode="contain" style={styles.image} />;
    default:
      return null;
  }
};

export const Medal: React.FC<Props> = (props: Props) => {
  const { rank } = props;
  return (
    <View style={styles.container}>
      <MedalImage rank={rank} />
    </View>
  );
};

interface Style {
  container: ViewStyle;
  image: ImageStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    position: 'absolute',
    top: TOP_OFFSET,
    right: 0,
    marginRight: 3 * theme.margins.unit,
  },
  image: {
    width: MEDAL_SIZE,
  },
});
