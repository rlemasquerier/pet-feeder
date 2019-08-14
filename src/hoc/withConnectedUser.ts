import { graphql } from 'react-apollo';
import { getConnectedUser } from '../graphql/queries';
import { User } from '../types/types';

interface Response {
  me: User;
}
interface InputProps {}
interface Variables {}

export const withConnectedUser = graphql<InputProps, Response, Variables, {}>(getConnectedUser, {
  props: ({ data }) => ({
    user: data && data.me,
  }),
});
