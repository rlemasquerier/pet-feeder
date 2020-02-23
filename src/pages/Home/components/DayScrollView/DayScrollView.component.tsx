import React from 'react';
import { ScrollView } from 'react-native';
import moment, { Moment } from 'moment';
import { useQuery, useMutation } from '@apollo/react-hooks';
import theme from 'pet-feeder/src/theme';
import { FeedPetButton } from '../FeedPetButton/FeedPetButton.component';
import { Loader, GenericError, LargeButton } from '../../../../components';
import { HalfDayCard } from './HalfDayCard';
import { computeDayHalf, dateToString } from '../../../../services';
import { usePet } from 'pet-feeder/src/hooks';
import { showError } from 'pet-feeder/src/services/toaster';
import { navigator, PAGES } from 'pet-feeder/src/services/navigation';
import { createRecord } from 'pet-feeder/src/graphql/mutations';
import { Record } from 'pet-feeder/src/types';
import { ActivityCard } from './ActivityCard';
import { getDailyRecords } from 'pet-feeder/src/graphql/queries';

interface Props {
  selectedDate: Moment;
  tribeId: string;
}

export const DayScrollView: React.FC<Props> = ({ selectedDate, tribeId }: Props) => {
  const dayString = dateToString(selectedDate);
  const morningQueryResult = useQuery(getDailyRecords, {
    variables: { dateString: dayString, dayHalf: 'morning' },
    pollInterval: 300000,
  });

  const eveningQueryResult = useQuery(getDailyRecords, {
    variables: { dateString: dayString, dayHalf: 'afternoon' },
    pollInterval: 300000,
  });

  const [addRecord, addRecordMutationResult] = useMutation(createRecord);
  const petQueryResult = usePet(tribeId);

  const addRecordLoading = addRecordMutationResult.loading;
  const loading =
    morningQueryResult.loading || eveningQueryResult.loading || petQueryResult.loading;
  const error = morningQueryResult.error || petQueryResult.error;

  if (loading) return <Loader size={30} />;

  if (error) {
    return <GenericError />;
  }

  const records = {
    morning: morningQueryResult.data.dailyRecords,
    evening: eveningQueryResult.data.dailyRecords,
  };

  const pet = petQueryResult.pet;
  const petName = pet && pet.name;

  const isSelectedDateToday = (): boolean => {
    const now = moment();
    const yesterday = moment().subtract(1, 'day');
    const engagementDate = now.hour() < 3 ? yesterday : now;
    return engagementDate.isSame(selectedDate, 'days');
  };

  const getButtonStatus = () => {
    if (!isSelectedDateToday()) {
      return 'invisible';
    }
    const dayHalf = computeDayHalf(moment());

    if (records[dayHalf].filter((record: Record) => record.type === 'food').length === 0) {
      return 'active';
    }
    return 'inactive';
  };

  if (!petName) {
    showError("Oups, une erreur est survenue. Il semblerait que ton animal n'ait pas de nom !");
    return <GenericError />;
  }

  return (
    <ScrollView>
      <HalfDayCard
        halfDay={'morning'}
        pet={pet}
        record={records.morning.filter((record: Record) => record.type === 'food')[0]}
      />
      <HalfDayCard
        halfDay={'evening'}
        pet={pet}
        record={records.evening.filter((record: Record) => record.type === 'food')[0]}
      />
      {[...records.morning, ...records.evening]
        .filter(record => record.type !== 'food')
        .map((record: Record) => {
          return <ActivityCard record={record} key={record.id} />;
        })}
      <FeedPetButton
        onPress={async () => {
          await addRecord({ variables: { type: 'food' } });
          morningQueryResult.refetch();
          eveningQueryResult.refetch();
        }}
        status={getButtonStatus()}
        loading={addRecordLoading}
        label={`NOURRIR ${petName.toUpperCase()}`}
      />
      {isSelectedDateToday() && (
        <LargeButton
          label={'Autre action'.toUpperCase()}
          color={theme.colors.secondaryAction}
          onPress={() => {
            navigator.navigate(PAGES.CUSTOM_ACTIONS, { dayString });
          }}
        />
      )}
    </ScrollView>
  );
};
