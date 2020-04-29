import React from 'react';
import { Dimensions, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { alpha, perspective } from './Constants';
import Animated from 'react-native-reanimated';
import { bInterpolate } from 'react-native-redash';
import {} from 'react-native';
import theme from '../../theme';
import { LargeButton, Icon, Loader } from '../../components';
import environment from 'pet-feeder/src/environment';
import { useCurrentUser } from 'pet-feeder/src/hooks';
import { navigator, PAGES } from 'pet-feeder/src/services/navigation';
import { ProfilePicture } from './ProfilePicture';

const CENTRAL_ICONS_AREA_WIDTH = 200;
const CENTRAL_ICONS_AREA_HEIGHT = 40;
const CENTRAL_ICONS_SIZE = 40;

const { width } = Dimensions.get('window');

interface Style {
  container: ViewStyle;
  text: TextStyle;
  header: ViewStyle;
  content: ViewStyle;
  username: TextStyle;
  centralIconsArea: ViewStyle;
  centralIconsContainer: ViewStyle;
  detailsItem: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 3 * theme.margins.unit,
    backgroundColor: theme.colors.backgroundColor,
  },
  text: {
    ...theme.fonts.regular,
  },
  header: {
    width: '100%',
    backgroundColor: theme.colors.banner,
  },
  content: {
    flex: 1,

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

interface ProfileDetailsProps {
  onPress: () => void;
  transition: Animated.Node<number>;
}

export const ProfileDetails = ({ transition, onPress }: ProfileDetailsProps) => {
  const { user } = useCurrentUser();
  if (!user) {
    return <Loader size={100} />;
  }

  const rotateY = bInterpolate(transition, 0, -alpha);
  const scale = bInterpolate(transition, 1, 0.9);
  const opacity = bInterpolate(transition, 0, 0.5);
  const borderRadius = bInterpolate(transition, 0, 20);
  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            borderRadius,
            transform: [
              perspective,
              { translateX: width / 2 },
              { rotateY },
              { translateX: -width / 2 },
              { scale },
            ],
          },
        ]}
      >
        <ProfilePicture user={user} />
        <Text style={styles.username}>{user.name}</Text>
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
        </View>
        <LargeButton
          style={{ width: 200 }}
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
        <Text
          onPress={() => navigator.navigate(PAGES.PRIVACY_POLICY)}
          style={{ textDecorationLine: 'underline' }}
        >
          Politique de confidentialité
        </Text>
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'black',
          opacity,
        }}
      />
    </>
  );
};
