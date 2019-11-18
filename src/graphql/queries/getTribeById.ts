import gql from 'graphql-tag';

export const getTribeById = gql`
  query($id: String!) {
    tribeById(input: { id: $id }) {
      id
      name
      petName
      ownerId
      members
      timestamp
    }
  }
`;
