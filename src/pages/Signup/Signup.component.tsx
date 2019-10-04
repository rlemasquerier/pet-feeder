import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Formik, FormikActions } from 'formik';
import { Page } from 'pet-feeder/src/components';
import { SignupForm, Values } from './SignupForm';
import { User, UserInput, Credentials } from 'pet-feeder/src/types';
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo';

const initialValues: Values = {
  email: '',
  password: '',
  name: '',
};

interface UserMutationData {
  createUser: User;
}

type AddUserMutationType = (
  options?: MutationFunctionOptions<UserMutationData, UserInput>
) => Promise<void | ExecutionResult<UserMutationData>>;

const ADD_USER = gql`
  mutation createUser($email: String!, $password: String!, $name: String!, $role: String!) {
    createUser(input: { email: $email, password: $password, name: $name, role: $role }) {
      id
      name
      email
      role
    }
  }
`;

const handleSignup = async ({
  values,
  addUserMutation,
  resetForm,
}: {
  values: Values;
  addUserMutation: AddUserMutationType;
  resetForm: (nextValues?: Values) => void;
}) => {
  const addUserResult = await addUserMutation({
    variables: {
      email: values.email,
      password: values.password,
      name: values.name,
      role: 'feeder',
    },
  });
  if (addUserResult && addUserResult.data && addUserResult.data.createUser) {
    resetForm();
  }
};

export interface Props {
  login: (credentials: Credentials) => void;
}

export const Signup: React.FC<Props> = (props: Props) => {
  const [addUserMutation] = useMutation<UserMutationData, UserInput>(ADD_USER);

  const onSubmitForm = async (
    values: Values,
    { resetForm }: FormikActions<Values>
  ): Promise<void> => {
    await handleSignup({
      values,
      addUserMutation,
      resetForm,
    });
    await props.login({ email: values.email, password: values.password });
  };

  return (
    <Page>
      <Formik onSubmit={onSubmitForm} initialValues={initialValues} component={SignupForm} />
    </Page>
  );
};
