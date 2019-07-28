import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle, Image, ImageStyle } from 'react-native';
import theme from './../../theme';

const PROFILE_PICTURE_SIZE = 150;
const HEADER_HEIGHT = (2 / 3) * PROFILE_PICTURE_SIZE;

export class Profile extends Component<{}, {}> {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.profileImage} source={theme.images.profilePicturePlaceholder} />
        </View>
        <View style={styles.content}>
          <Text style={styles.username}>John Doe</Text>
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
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
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
    alignItems: 'stretch',
  },
  username: {
    ...theme.fonts.title,
  },
});
