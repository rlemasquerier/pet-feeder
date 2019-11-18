import { useQuery } from '@apollo/react-hooks';
import { User, Tribe } from 'pet-feeder/src/types';
import { getConnectedUser, getTribeById } from 'pet-feeder/src/graphql/queries';

export const useCurrentUser = () => {
  const { loading, error, data } = useQuery<{ me: User }>(getConnectedUser);
  const user = data && data.me;
  return { loading, error, user };
};

export const usePetName = (tribeId: string) => {
  const { loading, error, data } = useQuery<{ tribeById: Tribe }>(getTribeById, {
    variables: { id: tribeId },
  });
  const petName = data && data.tribeById && data.tribeById && data.tribeById.petName;
  return { loading, error, petName };
};
