import React from 'react';
import { Formik } from 'formik';
import { Page } from 'pet-feeder/src/components';
import { SignupForm, Values } from './SignupForm';

const initialValues: Values = {
  email: '',
  password: '',
  name: '',
};

export const Signup: React.FC<null> = () => {
  const onSubmitForm = (values: Values) => {
    console.log(values);
  };
  return (
    <Page>
      <Formik onSubmit={onSubmitForm} initialValues={initialValues} component={SignupForm} />
    </Page>
  );
};
