import { graphql } from 'react-apollo';
import { updateUserNotificationsToken } from 'pet-feeder/src/graphql/mutations';
import { User } from '../types/types';

interface Response {
  editUser: User;
}
interface InputProps {}
interface Variables {
  id: string;
  fcmToken: string;
}

export const withNotificationsTokenRefresh = graphql<InputProps, Response, Variables, {}>(
  updateUserNotificationsToken,
  {
    props: ({ mutate }) => {
      return {
        updateUserFCM: mutate,
      };
    },
  }
);
