import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Page, LargeButton, Header } from 'pet-feeder/src/components';
import theme from 'pet-feeder/src/theme';
import { useMutation } from 'react-apollo';
import { createRecord } from 'pet-feeder/src/graphql/mutations';
import { navigator } from 'pet-feeder/src/services/navigation';
import { getDailyRecords } from 'pet-feeder/src/graphql/queries';
import { NavigationProp } from 'react-navigation-stack/lib/typescript/types';
import { RecordType } from 'pet-feeder/src/types';
import { useCurrentUser, useCurrentTribe } from 'pet-feeder/src/hooks';
import { withBlockedUserCheck } from 'pet-feeder/src/services/user';

interface Props {
  navigation: {
    getParam: (paramName: string) => string;
  };
}

export const CustomActions: React.FC<Props & NavigationProp> = (props: Props & NavigationProp) => {
  const dayString = props.navigation.getParam('dayString');
  const dayHalf = props.navigation.getParam('dayHalf');
  const { user } = useCurrentUser();
  const { tribe } = useCurrentTribe(user && user.tribeMember[0]);

  const [addRecord, addRecordMutationResult] = useMutation(createRecord, {
    update(cache, { data: { createRecord } }) {
      // @ts-ignore
      const { dailyRecords } = cache.readQuery({
        query: getDailyRecords,
        variables: { dateString: dayString, dayHalf },
      });
      const updatedDailyRecords = dailyRecords.concat([createRecord]);
      cache.writeQuery({
        query: getDailyRecords,
        data: { dailyRecords: updatedDailyRecords },
        variables: { dateString: dayString, dayHalf },
      });
    },
  });
  const addRecordLoading = addRecordMutationResult.loading;

  const onAddRecordPress = withBlockedUserCheck(async (type: RecordType) => {
    addRecord({ variables: { type } });
    navigator.back();
  }, user);

  if (!tribe) {
    return null;
  }

  return (
    <Page>
      <Header title="Autres actions" />
      <View style={styles.container}>
        {tribe.customActions.map(action => {
          return (
            <LargeButton
              key={action.id}
              style={{ marginVertical: 2 * theme.margins.unit }}
              label={action.displayedDescription.toUpperCase()}
              color={theme.colors.secondary}
              loading={addRecordLoading}
              onPress={async () => onAddRecordPress(action.name)}
            />
          );
        })}
      </View>
      <LargeButton
        style={{ marginVertical: 2 * theme.margins.unit }}
        label={'Retour'.toUpperCase()}
        color={theme.colors.secondaryAction}
        loading={addRecordLoading}
        onPress={() => navigator.back()}
      />
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
