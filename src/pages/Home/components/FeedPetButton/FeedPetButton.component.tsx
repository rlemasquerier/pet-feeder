import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { LargeButton, LottieAnimation } from '../../../../components';
import theme from './../../../../theme';

interface Props {
  onPress: () => void;
  status: 'active' | 'inactive' | 'invisible';
  label: string;
  inactiveLabel?: string;
  loading?: boolean;
}

export const FeedPetButton: React.FC<Props> = (props: Props) => {
  switch (props.status) {
    case 'active':
      return (
        <View style={styles.container}>
          <LargeButton
            label={props.label}
            color={theme.colors.secondary}
            onPress={props.onPress}
            loading={props.loading}
          />
        </View>
      );
    case 'inactive':
      return (
        <View style={styles.container}>
          <LargeButton
            label={props.inactiveLabel || props.label}
            color={theme.colors.secondary}
            onPress={props.onPress}
            disabled
          />
        </View>
      );
    default:
      return (
        <View style={styles.animation}>
          <LottieAnimation size={150} name={theme.animations.cat} />
        </View>
      );
  }
};

interface Style {
  container: ViewStyle;
  animation: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    marginVertical: 5 * theme.margins.unit,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  animation: {
    alignSelf: 'center',
  },
});
