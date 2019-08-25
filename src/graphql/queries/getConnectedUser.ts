import gql from 'graphql-tag';

export const getConnectedUser = gql`
  query {
    me {
      id
      email
      name
      role
      tribeMember
      tribeOwner
      fcmToken
    }
  }
`;
