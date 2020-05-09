import gql from 'graphql-tag';

export const getAvailableCustomActions = gql`
  query {
    customActions {
      id
      name
      displayedDescription
      displayedInAction
    }
  }
`;
