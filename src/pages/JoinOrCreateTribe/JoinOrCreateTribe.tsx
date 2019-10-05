import React from 'react';
import { Text, TextStyle, StyleSheet, ViewStyle } from 'react-native';
import { Formik } from 'formik';
import theme from './../../theme';
import { Page } from 'pet-feeder/src/components';
import { CreateTribeForm, Values as CreateTribeFormValues } from './CreateTribeForm';
import { JoinTribeForm, Values as JoinTribeFormValues } from './JoinTribeForm';

interface Props {}

const initialCreateTribeValues: CreateTribeFormValues = {
  name: '',
  password: '',
};

const initialJoinTribeValues: JoinTribeFormValues = {
  name: '',
  password: '',
};

export const JoinOrCreateTribe: React.FC<Props> = (props: Props) => {
  console.log('props', props);
  const onSubmitCreateTribeForm = async (values: CreateTribeFormValues): Promise<void> => {
    console.log('values', values);
    return;
  };
  const onSubmitJoinTribeForm = async (values: JoinTribeFormValues): Promise<void> => {
    console.log('values', values);
    return;
  };
  return (
    <Page>
      <Text style={styles.text}>Bienvenue, Michel</Text>
      <Text>Que souhaitez-vous faire ?</Text>
      <Text>Créer une nouvelle coloc</Text>
      <Formik
        onSubmit={onSubmitCreateTribeForm}
        initialValues={initialCreateTribeValues}
        component={CreateTribeForm}
      />
      <Text>Rejoindre une coloc existante</Text>
      <Formik
        onSubmit={onSubmitJoinTribeForm}
        initialValues={initialJoinTribeValues}
        component={JoinTribeForm}
      />
    </Page>
  );
};

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    ...theme.fonts.regular,
  },
});
