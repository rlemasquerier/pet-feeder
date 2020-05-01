import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import theme from '../../theme';
import { LargeButton, Icon, Loader, UserPictureBadge } from '../../components';
import environment from 'pet-feeder/src/environment';
import { useCurrentUser } from 'pet-feeder/src/hooks';
import { navigator, PAGES } from 'pet-feeder/src/services/navigation';
import { User } from 'pet-feeder/src/types';
import { withPageAnimation } from 'pet-feeder/src/hoc/PageWithAnimatedMenu/withPageAnimation';

const UserDetails = (props: { user: User }) => {
  const { user } = props;
  return (
    <View style={{ alignItems: 'center' }}>
      <UserPictureBadge userId={user.id} size={150} />
      <Text style={styles.username}>{user.name}</Text>
      <View style={styles.detailsItem}>
        <Icon
          style={{ marginRight: 3 * theme.margins.unit }}
          name="mail2"
          size={30}
          color={theme.colors.primary}
        />
        <Text>{user.email}</Text>
      </View>
    </View>
  );
};

interface ProfileDetailsProps {
  onPress: () => void;
}

export const ProfileDetails = withPageAnimation(({ onPress }: ProfileDetailsProps) => {
  const { user } = useCurrentUser();
  if (!user) {
    return <Loader size={100} />;
  }
  return (
    <>
      <UserDetails user={user} />
      <View style={styles.content}>
        <LargeButton
          style={{ width: 200, marginBottom: 3 * theme.margins.unit }}
          label="Ma Coloc"
          color={theme.colors.secondary}
          onPress={onPress}
        />
        {environment.ENV !== 'production' && (
          <LargeButton
            style={{ width: 200 }}
            label="Librairie"
            color={theme.colors.secondary}
            onPress={() => {
              navigator.navigate(PAGES.COMPONENTS_LIBRARY_MENU);
            }}
          />
        )}
      </View>
      <Text
        onPress={() => navigator.navigate(PAGES.PRIVACY_POLICY)}
        style={{ textDecorationLine: 'underline' }}
      >
        Politique de confidentialité
      </Text>
    </>
  );
});

interface Style {
  content: ViewStyle;
  username: TextStyle;
  detailsItem: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    ...theme.fonts.title,
    marginVertical: 3 * theme.margins.unit,
  },
  detailsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3 * theme.margins.unit,
  },
});
