import gql from 'graphql-tag';

export const createRecord = gql`
  mutation createRecord($type: String!) {
    createRecord(input: { type: $type }) {
      id
      type
      feederId
      feederName
      timestamp
    }
  }
`;
