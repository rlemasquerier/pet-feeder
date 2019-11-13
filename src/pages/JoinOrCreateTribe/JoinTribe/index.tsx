import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import theme from 'pet-feeder/src/theme';
import { JoinTribeForm, Values as JoinTribeFormValues } from './JoinTribeForm';
import { checkTribeCode } from 'pet-feeder/src/api/apiClient';
import { joinTribe as joinTribeMutation } from 'pet-feeder/src/graphql/mutations';
import { Tribe } from 'pet-feeder/src/types';
import { useCurrentUser } from 'pet-feeder/src/hooks';
import { navigator, PAGES } from 'pet-feeder/src/services/navigation';

interface Props {}

const initialJoinTribeValues: JoinTribeFormValues = {
  code: '',
};

interface JoinTribeMutationData {
  addUserToTribe: Tribe;
}

interface JoinTribeInput {
  tribeId: string;
  userId: string;
}

type JoinTribeMutationType = (
  options?: MutationFunctionOptions<JoinTribeMutationData, JoinTribeInput>
) => Promise<void | ExecutionResult<JoinTribeMutationData>>;

const handleJoinTribe = async ({
  tribeId,
  userId,
  joinTribeMutation,
}: {
  tribeId: string;
  userId: string;
  joinTribeMutation: JoinTribeMutationType;
}): Promise<Tribe | undefined> => {
  try {
    const joinTribeAnswer = await joinTribeMutation({
      variables: {
        tribeId,
        userId,
      },
    });
    if (joinTribeAnswer && joinTribeAnswer.data) {
      return joinTribeAnswer.data.addUserToTribe;
    } else {
      throw new Error('Join tribe answer not correct');
    }
  } catch (error) {
    console.warn('An error occurred when adding user to a tribe');
    throw error;
  }
};

export const JoinTribe: React.FC<Props> = () => {
  const { user } = useCurrentUser();
  if (!user) {
    return null;
  }
  const [joinTribe] = useMutation<JoinTribeMutationData, JoinTribeInput>(joinTribeMutation);
  const onSubmitJoinTribeForm = async (values: JoinTribeFormValues): Promise<void> => {
    try {
      const res = await checkTribeCode(values.code);
      const tribeIdToJoin = res.data;
      await handleJoinTribe({
        tribeId: tribeIdToJoin,
        userId: user.id,
        joinTribeMutation: joinTribe,
      });
      navigator.navigate(PAGES.HOME);
    } catch (error) {
      console.warn('An error has occured');
    }
  };
  return (
    <>
      <Text style={styles.subtitleText}>Rejoindre une coloc existante</Text>
      <Formik
        onSubmit={onSubmitJoinTribeForm}
        initialValues={initialJoinTribeValues}
        component={JoinTribeForm}
      />
    </>
  );
};

interface Style {
  subtitleText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  subtitleText: {
    ...theme.fonts.big,
  },
});
