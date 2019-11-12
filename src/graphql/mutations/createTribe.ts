import gql from 'graphql-tag';

export const createTribe = gql`
  mutation createTribe($name: String!, $members: [String!]!) {
    createTribe(input: { name: $name, members: $members }) {
      id
      name
      ownerId
      members
      timestamp
    }
  }
`;
