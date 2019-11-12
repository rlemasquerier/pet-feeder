import { useQuery } from '@apollo/react-hooks';
import { User } from 'pet-feeder/src/types';
import { getConnectedUser } from 'pet-feeder/src/graphql/queries';

export const useCurrentUser = () => {
  const { loading, error, data } = useQuery<{ me: User }>(getConnectedUser);
  const user = data && data.me;
  return { loading, error, user };
};
