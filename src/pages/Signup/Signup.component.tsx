import React from 'react';
import { Image, ImageStyle, StyleSheet, View, ViewStyle, Text, TextStyle } from 'react-native';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Formik, FormikActions } from 'formik';
import { Page } from 'pet-feeder/src/components';
import { ContainerProps } from './Signup.container';
import { SignupForm, Values } from './SignupForm';
import { User, UserInput } from 'pet-feeder/src/types';
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo';
import { PAGES } from 'pet-feeder/src/services/navigation';
import theme from 'pet-feeder/src/theme';

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

export interface Props extends ContainerProps {}

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
    await props.login(
      { email: values.email, password: values.password },
      { redirectPage: PAGES.JOIN_OR_CREATE_TRIBE }
    );
  };

  return (
    <Page>
      <Image
        source={theme.images.signupBackgroundTop}
        style={styles.imageTop}
        resizeMode="stretch"
      />
      <Image
        source={theme.images.signupBackgroundBottom}
        style={styles.imageBottom}
        resizeMode="stretch"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Créer un compte</Text>
      </View>
      <View style={styles.container}>
        <Formik onSubmit={onSubmitForm} initialValues={initialValues} component={SignupForm} />
      </View>
    </Page>
  );
};

interface Style {
  container: ViewStyle;
  imageTop: ImageStyle;
  imageBottom: ImageStyle;
  text: TextStyle;
  textContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    ...theme.fonts.title,
    color: theme.colors.white,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    paddingTop: 5 * theme.margins.unit,
    paddingLeft: 3 * theme.margins.unit,
  },
  imageTop: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  imageBottom: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});
