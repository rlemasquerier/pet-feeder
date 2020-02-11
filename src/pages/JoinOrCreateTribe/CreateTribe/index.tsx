import React from 'react';
import { Formik } from 'formik';
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import { useCurrentUser } from 'pet-feeder/src/hooks';
import { createTribe as createTribeMutation } from 'pet-feeder/src/graphql/mutations/createTribe';
import { Loader } from 'pet-feeder/src/components';
import { CreateTribeForm, Values as CreateTribeFormValues } from './CreateTribeForm';
import { User, Tribe } from 'pet-feeder/src/types';
import { createTribeCode } from 'pet-feeder/src/api/apiClient';

interface Props {
  onCodeReceived: (code: string) => void;
}

const initialCreateTribeValues: CreateTribeFormValues = {
  name: '',
  petName: '',
  petSex: 'male',
};

interface CreateTribeMutationData {
  createTribe: Tribe;
}

interface CreateTribeInput {
  name: string;
  petName: string;
  petSex: string;
  members: string[];
}

type CreateTribeMutationType = (
  options?: MutationFunctionOptions<CreateTribeMutationData, CreateTribeInput>
) => Promise<void | ExecutionResult<CreateTribeMutationData>>;

const handleCreateTribe = async ({
  values,
  user,
  createTribeMutation,
}: {
  values: CreateTribeFormValues;
  user: User;
  createTribeMutation: CreateTribeMutationType;
}): Promise<Tribe | undefined> => {
  try {
    const createTribeAnswer = await createTribeMutation({
      variables: {
        name: values.name,
        petName: values.petName,
        petSex: values.petSex,
        members: [user.id],
      },
    });
    if (createTribeAnswer && createTribeAnswer.data) {
      return createTribeAnswer.data.createTribe;
    } else {
      throw new Error('Create tribe answer not correct');
    }
  } catch (error) {
    console.warn('An error occurred when creating a tribe');
  }
};

export const CreateTribe: React.FC<Props> = (props: Props) => {
  const { user } = useCurrentUser();
  const [createTribe] = useMutation<CreateTribeMutationData, CreateTribeInput>(createTribeMutation);
  if (!user) {
    return <Loader size={100} />;
  }
  const onSubmitCreateTribeForm = async (values: CreateTribeFormValues): Promise<void> => {
    const createdTribe = await handleCreateTribe({
      values,
      user,
      createTribeMutation: createTribe,
    });
    if (createdTribe) {
      const createCodeResponse = await createTribeCode(createdTribe.id);
      const code = createCodeResponse.data.code;
      props.onCodeReceived(code);
    }
  };
  return (
    <Formik
      onSubmit={onSubmitCreateTribeForm}
      initialValues={initialCreateTribeValues}
      component={CreateTribeForm}
    />
  );
};
