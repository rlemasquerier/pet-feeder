import gql from 'graphql-tag';

export const updateUserNotificationsToken = gql`
  mutation editUser($id: String!, $fcmToken: String!) {
    editUser(input: { id: $id, patch: { fcmToken: $fcmToken } }) {
      id
      email
      name
      role
      fcmToken
    }
  }
`;
