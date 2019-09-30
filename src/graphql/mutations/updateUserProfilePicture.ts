import gql from 'graphql-tag';

export const updateUserProfilePictureUrl = gql`
  mutation editUser($id: String!, $profilePictureUrl: String!) {
    editUser(input: { id: $id, patch: { profilePictureUrl: $profilePictureUrl } }) {
      id
      email
      name
      role
      profilePictureUrl
    }
  }
`;
