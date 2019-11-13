import gql from 'graphql-tag';

export const joinTribe = gql`
  mutation addUserToTribe($tribeId: String!, $userId: String!) {
    addUserToTribe(input: { tribeId: $tribeId, userId: $userId }) {
      id
      name
      ownerId
      members
      timestamp
    }
  }
`;
