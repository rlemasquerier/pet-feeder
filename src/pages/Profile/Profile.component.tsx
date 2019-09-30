import React from 'react';
import {
  Text,
  TextStyle,
  StyleSheet,
  View,
  ViewStyle,
  Image,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import theme from './../../theme';
import { LargeButton, Icon, Page } from '../../components';
import { uploadPicture } from '../../api/apiClient';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ImagePicker from 'react-native-image-picker';
import { EditUserInput, User } from 'pet-feeder/src/types/types';
import { getConnectedUser } from 'pet-feeder/src/graphql/queries';
import { updateUserProfilePictureUrl } from 'pet-feeder/src/graphql/mutations';

const PROFILE_PICTURE_SIZE = 150;
const PROFILE_PICTURE_ACTIVE_OPACITY = 0.8;
const HEADER_HEIGHT = (2 / 3) * PROFILE_PICTURE_SIZE;

const CENTRAL_ICONS_AREA_WIDTH = 200;
const CENTRAL_ICONS_AREA_HEIGHT = 40;
const CENTRAL_ICONS_SIZE = 40;

interface UpdateUserMutationData {
  editUser: EditUserInput;
}

export const Profile: React.FC<{}> = () => {
  const [updateUserUrl] = useMutation<UpdateUserMutationData, EditUserInput>(
    updateUserProfilePictureUrl
  );
  const connectedUser = useQuery<{ me: User }>(getConnectedUser);

  const onPressProfilePicture = async () => {
    const options = {
      title: 'Choisis ta photo de profil',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.1,
    };

    ImagePicker.showImagePicker(options, async response => {
      if (response.didCancel || response.error || response.customButton) {
        return;
      } else {
        const uploadResponse = await uploadPicture(response);
        if (connectedUser.data && connectedUser.data.me.id && uploadResponse.uri) {
          updateUserUrl({
            variables: { id: connectedUser.data.me.id, profilePictureUrl: uploadResponse.uri },
          });
        }
      }
    });
  };
  return (
    <Page>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={PROFILE_PICTURE_ACTIVE_OPACITY}
          onPress={onPressProfilePicture}
          style={styles.profileImageContainer}
        >
          <Image
            source={
              connectedUser.data && connectedUser.data.me.profilePictureUrl
                ? {
                    uri: connectedUser.data.me.profilePictureUrl,
                  }
                : theme.images.profilePicturePlaceholder
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.username}>{connectedUser.data && connectedUser.data.me.name}</Text>
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
    </Page>
  );
};

interface Style {
  text: TextStyle;
  profileImageContainer: ViewStyle;
  profileImage: ImageStyle;
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
  profileImageContainer: {
    position: 'absolute',
    left: '50%',
    marginLeft: -PROFILE_PICTURE_SIZE / 2,
    bottom: -PROFILE_PICTURE_SIZE / 2,
  },
  profileImage: {
    height: PROFILE_PICTURE_SIZE,
    width: PROFILE_PICTURE_SIZE,
    borderRadius: PROFILE_PICTURE_SIZE / 2,
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
