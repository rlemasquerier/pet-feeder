import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Formik, FormikActions } from 'formik';
import { Page } from 'pet-feeder/src/components';
import { SignupForm, Values } from './SignupForm';
import { User, UserInput } from 'pet-feeder/src/types/types';
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

export const Signup: React.FC<null> = () => {
  const [addUserMutation] = useMutation<UserMutationData, UserInput>(ADD_USER);

  const onSubmitForm = async (values: Values, { resetForm }: FormikActions<Values>) => {
    handleSignup({
      values,
      addUserMutation,
      resetForm,
    });
  };
  return (
    <Page>
      <Formik onSubmit={onSubmitForm} initialValues={initialValues} component={SignupForm} />
    </Page>
  );
};
