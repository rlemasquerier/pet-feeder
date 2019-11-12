import React, { useState } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { Formik } from 'formik';
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import { useCurrentUser } from 'pet-feeder/src/hooks';
import { createTribe as createTribeMutation } from 'pet-feeder/src/graphql/mutations/createTribe';
import theme from './../../theme';
import { Page, TopBanner, TribeCode, Button, Loader } from 'pet-feeder/src/components';
import { CreateTribeForm, Values as CreateTribeFormValues } from './CreateTribeForm';
import { JoinTribeForm, Values as JoinTribeFormValues } from './JoinTribeForm';
import { User, Tribe } from 'pet-feeder/src/types';

interface Props {}

interface CreateTribeMutationData {
  createTribe: Tribe;
}

interface CreateTribeInput {
  name: string;
  members: string[];
}

type CreateTribeMutationType = (
  options?: MutationFunctionOptions<CreateTribeMutationData, CreateTribeInput>
) => Promise<void | ExecutionResult<CreateTribeMutationData>>;

const initialCreateTribeValues: CreateTribeFormValues = {
  name: '',
};

const initialJoinTribeValues: JoinTribeFormValues = {
  code: '',
};

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

export const JoinOrCreateTribe: React.FC<Props> = () => {
  const [code, setCode] = useState<string | null>(null);
  const [createTribe] = useMutation<CreateTribeMutationData, CreateTribeInput>(createTribeMutation);
  const { user } = useCurrentUser();
  if (!user) {
    return <Loader size={100} />;
  }
  const onSubmitCreateTribeForm = async (values: CreateTribeFormValues): Promise<void> => {
    const createdTribe = await handleCreateTribe({
      values,
      user,
      createTribeMutation: createTribe,
    });
    setCode('AZE123');
  };
  const onSubmitJoinTribeForm = async (values: JoinTribeFormValues): Promise<void> => {
    console.log('values', values);
  };
  return (
    <Page>
      <TopBanner label={`Bienvenue, ${user.name} !`} />
      <View style={styles.container}>
        <Text style={styles.titleText}>Que souhaites-tu faire ?</Text>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.subtitleText}>Créer une nouvelle coloc</Text>
          {!code && (
            <Formik
              onSubmit={onSubmitCreateTribeForm}
              initialValues={initialCreateTribeValues}
              component={CreateTribeForm}
            />
          )}
          {!!code && (
            <>
              <Text style={{ marginVertical: 3 * theme.margins.unit }}>
                {`Voici le code de ta coloc. Donne-le à tes colocs pour qu'ils puissent te rejoindre !`}
              </Text>
              <TribeCode code={code} />
              <View style={{ marginVertical: 3 * theme.margins.unit }}>
                <Button label="Continuer" onPress={() => {}} isLoading={false} />
              </View>
            </>
          )}
          {!code && (
            <>
              <Text style={styles.subtitleText}>Rejoindre une coloc existante</Text>
              <Formik
                onSubmit={onSubmitJoinTribeForm}
                initialValues={initialJoinTribeValues}
                component={JoinTribeForm}
              />
            </>
          )}
        </View>
      </View>
    </Page>
  );
};

interface Style {
  container: ViewStyle;
  titleText: TextStyle;
  subtitleText: TextStyle;
  codeText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    padding: 5 * theme.margins.unit,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  titleText: {
    ...theme.fonts.hugeStrong,
  },
  subtitleText: {
    ...theme.fonts.big,
  },
  codeText: {
    ...theme.fonts.code,
  },
});