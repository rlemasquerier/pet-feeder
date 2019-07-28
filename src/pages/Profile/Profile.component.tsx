import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle, Image, ImageStyle } from 'react-native';
import theme from './../../theme';
import { LargeButton, Icon } from '../../components';

const PROFILE_PICTURE_SIZE = 150;
const HEADER_HEIGHT = (2 / 3) * PROFILE_PICTURE_SIZE;

const CENTRAL_ICONS_AREA_WIDTH = 200;
const CENTRAL_ICONS_AREA_HEIGHT = 40;
const CENTRAL_ICONS_SIZE = 40;

export class Profile extends Component<{}, {}> {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.profileImage} source={theme.images.profilePicturePlaceholder} />
        </View>
        <View style={styles.content}>
          <Text style={styles.username}>John Doe</Text>
          <View style={styles.centralIconsArea}>
            <View style={styles.centralIconsContainer}>
              <View style={{ alignItems: 'center' }}>
                <Icon name="spoon-knife" size={CENTRAL_ICONS_SIZE} color={theme.colors.primary} />
                <Text style={styles.text}>32</Text>
              </View>
            </View>
          </View>
          <View style={styles.detailsItemContainer}>
            <View style={styles.detailsItem}>
              <Icon
                style={{ marginRight: 3 * theme.margins.unit }}
                name="mail2"
                size={30}
                color={theme.colors.primary}
              />
              <Text style={styles.text}>john.doe@gmail.com</Text>
            </View>
            <View style={styles.detailsItem}>
              <Icon
                style={{ marginRight: 3 * theme.margins.unit }}
                name="pencil"
                size={30}
                color={theme.colors.primary}
              />
              <Text style={styles.text}>John</Text>
            </View>
          </View>
          <LargeButton
            style={{ width: 200 }}
            label="Modifier"
            color={theme.colors.secondary}
            onPress={() => {}}
          />
        </View>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  text: TextStyle;
  profileImage: ImageStyle;
  header: ViewStyle;
  content: ViewStyle;
  username: TextStyle;
  centralIconsArea: ViewStyle;
  centralIconsContainer: ViewStyle;
  detailsItemContainer: ViewStyle;
  detailsItem: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    ...theme.fonts.regular,
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: theme.colors.banner,
    marginBottom: PROFILE_PICTURE_SIZE / 2,
  },
  profileImage: {
    position: 'absolute',
    left: '50%',
    marginLeft: -PROFILE_PICTURE_SIZE / 2,
    height: PROFILE_PICTURE_SIZE,
    width: PROFILE_PICTURE_SIZE,
    bottom: -PROFILE_PICTURE_SIZE / 2,
    borderRadius: PROFILE_PICTURE_SIZE / 2,
    resizeMode: 'cover',
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
  detailsItemContainer: {},
  detailsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3 * theme.margins.unit,
  },
});
