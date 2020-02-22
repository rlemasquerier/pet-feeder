import gql from 'graphql-tag';

export const createRecord = gql`
  mutation createRecord {
    createRecord {
      id
    }
  }
`;
