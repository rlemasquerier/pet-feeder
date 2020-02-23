import gql from 'graphql-tag';

export const getDailyRecords = gql`
  query dailyRecords($dateString: String!, $dayHalf: String) {
    dailyRecords(input: { dateString: $dateString, dayHalf: $dayHalf }) {
      id
      type
      feederId
      feederName
      timestamp
    }
  }
`;
