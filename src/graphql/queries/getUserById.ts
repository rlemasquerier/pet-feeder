import gql from 'graphql-tag';

export const getUserById = gql`
  query($id: String!) {
    userById(input: { id: $id }) {
      id
      name
      profilePictureUrl
    }
  }
`;
