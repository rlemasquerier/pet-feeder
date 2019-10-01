import React from 'react';
import { Image } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { getUserById } from 'pet-feeder/src/graphql/queries';
import theme from 'pet-feeder/src/theme';

interface Props {
  userId: string;
  size: number;
}

export const UserPictureBadge: React.FC<Props> = (props: Props) => {
  const user = useQuery(getUserById, {
    variables: { id: props.userId },
  });
  const imageStyle = {
    height: props.size,
    width: props.size,
    borderRadius: props.size / 2,
  };
  return (
    <Image
      source={
        user.data && user.data.userById && user.data.userById.profilePictureUrl
          ? {
              uri: user.data.userById.profilePictureUrl,
            }
          : theme.images.profilePicturePlaceholder
      }
      style={imageStyle}
    />
  );
};
