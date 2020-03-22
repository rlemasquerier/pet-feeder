import gql from 'graphql-tag';

export const createTribe = gql`
  mutation createTribe($name: String!, $petName: String!, $petSex: String!, $members: [String!]!) {
    createTribe(input: { name: $name, petName: $petName, petSex: $petSex, members: $members }) {
      id
      name
      petName
      pet {
        name
        sex
      }
      ownerId
      timestamp
    }
  }
`;
