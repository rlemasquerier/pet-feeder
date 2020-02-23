import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Page, LargeButton, Header } from 'pet-feeder/src/components';
import theme from 'pet-feeder/src/theme';
import { useMutation } from 'react-apollo';
import { createRecord } from 'pet-feeder/src/graphql/mutations';
import { navigator } from 'pet-feeder/src/services/navigation';
import { getDailyRecords } from 'pet-feeder/src/graphql/queries';
import { NavigationProp } from 'react-navigation-stack/lib/typescript/types';

interface Props {
  navigation: {
    getParam: (paramName: string) => string;
  };
}

export const CustomActions: React.FC<Props & NavigationProp> = (props: Props & NavigationProp) => {
  const dayString = props.navigation.getParam('dayString');
  const [addRecord, addRecordMutationResult] = useMutation(createRecord, {
    update(cache, { data: { createRecord } }) {
      /* TODO: Improve this as it is not ideal
        1) The custom record is added to the afternoon query, but it could be belonging to the morning one
        2) Would be easier to update a query without variables, but a bigger refacto is needed (work with the "allRecords" query in the app)
      */
      // @ts-ignore
      const { dailyRecords } = cache.readQuery({
        query: getDailyRecords,
        variables: { dateString: dayString, dayHalf: 'afternoon' },
      });
      const updatedDailyRecords = dailyRecords.concat([createRecord]);
      cache.writeQuery({
        query: getDailyRecords,
        data: { dailyRecords: updatedDailyRecords },
        variables: { dateString: dayString, dayHalf: 'afternoon' },
      });
    },
  });
  const addRecordLoading = addRecordMutationResult.loading;

  return (
    <Page>
      <Header title="Autres actions" />
      <View style={styles.container}>
        <LargeButton
          label={'Litière'.toUpperCase()}
          color={theme.colors.secondary}
          loading={addRecordLoading}
          onPress={async () => {
            await addRecord({ variables: { type: 'litter' } });
            navigator.back();
          }}
        />
      </View>
    </Page>
  );
};

interface Style {
  container: ViewStyle;
  topBannerText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topBannerText: {
    ...theme.fonts.regular,
    color: theme.colors.white,
  },
});
