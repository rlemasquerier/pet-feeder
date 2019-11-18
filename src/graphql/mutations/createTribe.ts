import gql from 'graphql-tag';

export const createTribe = gql`
  mutation createTribe($name: String!, $petName: String!, $members: [String!]!) {
    createTribe(input: { name: $name, petName: $petName, members: $members }) {
      id
      name
      petName
      ownerId
      members
      timestamp
    }
  }
`;
