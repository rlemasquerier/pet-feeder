import { uploadPicture } from 'pet-feeder/src/api/apiClient';
import { User, EditUserInput, UpdateUserMutationData } from 'pet-feeder/src/types/types';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { MutationFunctionOptions, ExecutionResult } from '@apollo/react-common';

type UpdateUserProfilePictureMutationType = (
  options?: MutationFunctionOptions<UpdateUserMutationData, EditUserInput> | undefined
) => Promise<void | ExecutionResult<UpdateUserMutationData>>;

export const showProfilePictureImagePicker = async (
  user: User,
  updateUserMutation: UpdateUserProfilePictureMutationType
) => {
  const options = {
    title: 'Choisis ta photo de profil',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    quality: 0.3,
  };

  ImagePicker.showImagePicker(options, (response: ImagePickerResponse) =>
    updateUserProfilePictureFromImagePickerResponse(response, user, updateUserMutation)
  );
};

const updateUserProfilePictureFromImagePickerResponse = async (
  imagePickerResponse: ImagePickerResponse,
  user: User,
  updateUserMutation: UpdateUserProfilePictureMutationType
) => {
  if (
    imagePickerResponse.didCancel ||
    imagePickerResponse.error ||
    imagePickerResponse.customButton
  ) {
    return;
  } else {
    const uploadResponse = await uploadPicture(imagePickerResponse);
    if (uploadResponse.uri) {
      updateUserMutation({
        variables: { id: user.id, profilePictureUrl: uploadResponse.uri },
      });
    }
  }
};
