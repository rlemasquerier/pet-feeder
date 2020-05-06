import gql from 'graphql-tag';

export const updateTribeCustomActions = gql`
  mutation patchTribe($id: String!, $customActions: [String]!) {
    patchTribe(input: { id: $id, customActions: $customActions }) {
      id
      customActions {
        id
        name
        description
      }
    }
  }
`;
