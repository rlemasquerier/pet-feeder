import { graphql } from 'react-apollo';
import { getConnectedUser } from '../graphql/queries';
import { User } from '../types/types';
import ApolloClient from 'apollo-client';

interface Response {
  me: User;
}
interface InputProps {
  client: ApolloClient<{ user: User }>;
}
interface Variables {}

export const withConnectedUser = graphql<InputProps, Response, Variables, {}>(getConnectedUser, {
  props: ({ data, ownProps }) => {
    return {
      user: data && data.me,
      resetOnLogout: async () => ownProps.client.resetStore(),
    };
  },
});
