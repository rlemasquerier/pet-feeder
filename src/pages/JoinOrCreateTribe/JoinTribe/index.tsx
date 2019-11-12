import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import theme from 'pet-feeder/src/theme';
import { JoinTribeForm, Values as JoinTribeFormValues } from './JoinTribeForm';

interface Props {}

const initialJoinTribeValues: JoinTribeFormValues = {
  code: '',
};

export const JoinTribe: React.FC<Props> = () => {
  const onSubmitJoinTribeForm = async (values: JoinTribeFormValues): Promise<void> => {
    console.log('values', values);
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
