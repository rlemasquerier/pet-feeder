import gql from 'graphql-tag';

export const getRecords = gql`
  query($userId: String) {
    records(input: { userId: $userId }) {
      id
      feederId
      feederName
      timestamp
    }
  }
`;
