import React from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import theme from '../../theme';
import { LargeButton, Icon, Page, Loader } from '../../components';
import { PROFILE_PICTURE_SIZE, ProfilePicture } from './ProfilePicture';
import environment from 'pet-feeder/src/environment';
import { useCurrentUser } from 'pet-feeder/src/hooks';
import { navigator, PAGES } from 'pet-feeder/src/services/navigation';

const HEADER_HEIGHT = (2 / 3) * PROFILE_PICTURE_SIZE;

const CENTRAL_ICONS_AREA_WIDTH = 200;
const CENTRAL_ICONS_AREA_HEIGHT = 40;
const CENTRAL_ICONS_SIZE = 40;

export const Profile: React.FC<{}> = () => {
  const { user } = useCurrentUser();
  if (!user) {
    return <Loader size={100} />;
  }
  return (
    <Page>
      <View style={styles.header}>
        <ProfilePicture user={user} />
      </View>
      <View style={styles.content}>
        <Text style={styles.username}>{user.name}</Text>
        <View style={styles.centralIconsArea}>
          <View style={styles.centralIconsContainer}>
            <View style={{ alignItems: 'center' }}>
              <Icon
                style={{ marginBottom: 2 * theme.margins.unit }}
                name="spoon-knife"
                size={CENTRAL_ICONS_SIZE}
                color={theme.colors.action}
              />
              <Text style={styles.text}>32 fois</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.detailsItem}>
            <Icon
              style={{ marginRight: 3 * theme.margins.unit }}
              name="mail2"
              size={30}
              color={theme.colors.primary}
            />
            <Text style={styles.text}>{user.email}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Icon
              style={{ marginRight: 3 * theme.margins.unit }}
              name="pencil"
              size={30}
              color={theme.colors.primary}
            />
            <Text style={styles.text}>{user.name}</Text>
          </View>
        </View>
        <LargeButton
          style={{ width: 200 }}
          label="Modifier"
          color={theme.colors.secondary}
          onPress={() => {
            return;
          }}
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
        <Text
          onPress={() => navigator.navigate(PAGES.PRIVACY_POLICY)}
          style={{ textDecorationLine: 'underline' }}
        >
          Politique de confidentialité
        </Text>
      </View>
    </Page>
  );
};

interface Style {
  text: TextStyle;
  header: ViewStyle;
  content: ViewStyle;
  username: TextStyle;
  centralIconsArea: ViewStyle;
  centralIconsContainer: ViewStyle;
  detailsItem: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  text: {
    ...theme.fonts.regular,
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: theme.colors.banner,
    marginBottom: PROFILE_PICTURE_SIZE / 2,
  },
  content: {
    flex: 1,
    paddingVertical: 3 * theme.margins.unit,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  username: {
    ...theme.fonts.title,
    marginBottom: 5 * theme.margins.unit,
  },
  centralIconsArea: {
    width: CENTRAL_ICONS_AREA_WIDTH,
    height: CENTRAL_ICONS_AREA_HEIGHT,
    borderRadius: CENTRAL_ICONS_AREA_HEIGHT / 2,
    backgroundColor: theme.colors.placeholderColor,
    marginBottom: 15 * theme.margins.unit,
  },
  centralIconsContainer: {
    position: 'absolute',
    top: CENTRAL_ICONS_SIZE / 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3 * theme.margins.unit,
  },
});
