import { useQuery } from '@apollo/react-hooks';
import { User, Tribe } from 'pet-feeder/src/types';
import { getConnectedUser, getTribeById } from 'pet-feeder/src/graphql/queries';

export const useCurrentUser = () => {
  const { loading, error, data, refetch } = useQuery<{ me: User }>(getConnectedUser);
  const user = data && data.me;
  return { loading, error, user, refetchUser: refetch };
};

export const useCurrentTribe = (tribeId?: string) => {
  const { loading, error, data } = useQuery<{ tribeById: Tribe }>(getTribeById, {
    variables: { id: tribeId },
  });
  const tribe = data && data.tribeById;
  return { loading, error, tribe };
};

export const usePet = (tribeId: string) => {
  const { loading, error, data } = useQuery<{ tribeById: Tribe }>(getTribeById, {
    variables: { id: tribeId },
  });
  const pet = data && data.tribeById && data.tribeById.pet;
  return { loading, error, pet };
};
