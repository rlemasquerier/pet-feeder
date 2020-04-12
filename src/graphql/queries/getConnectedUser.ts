import gql from 'graphql-tag';

export const getConnectedUser = gql`
  query {
    me {
      id
      email
      name
      status
      role
      tribeMember
      tribeOwner
      fcmToken
      profilePictureUrl
    }
  }
`;
