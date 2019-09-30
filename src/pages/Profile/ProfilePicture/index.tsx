import React from 'react';
import { Image, ViewStyle, ImageStyle, TouchableOpacity, StyleSheet } from 'react-native';
import { User, EditUserInput, UpdateUserMutationData } from 'pet-feeder/src/types/types';
import theme from 'pet-feeder/src/theme';
import { useMutation } from 'react-apollo';
import { updateUserProfilePictureUrl } from 'pet-feeder/src/graphql/mutations';
import { showProfilePictureImagePicker } from './utils/imagePicker';

export const PROFILE_PICTURE_SIZE = 150;
const PROFILE_PICTURE_ACTIVE_OPACITY = 0.8;

interface Props {
  user: User;
}

export const ProfilePicture: React.FC<Props> = ({ user }: Props) => {
  const [updateUserUrl] = useMutation<UpdateUserMutationData, EditUserInput>(
    updateUserProfilePictureUrl
  );
  return (
    <TouchableOpacity
      activeOpacity={PROFILE_PICTURE_ACTIVE_OPACITY}
      onPress={() => showProfilePictureImagePicker(user, updateUserUrl)}
      style={styles.profileImageContainer}
    >
      <Image
        source={
          user && user.profilePictureUrl
            ? {
                uri: user.profilePictureUrl,
              }
            : theme.images.profilePicturePlaceholder
        }
        style={styles.profileImage}
      />
    </TouchableOpacity>
  );
};

interface Style {
  profileImageContainer: ViewStyle;
  profileImage: ImageStyle;
}

const styles = StyleSheet.create<Style>({
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
});
