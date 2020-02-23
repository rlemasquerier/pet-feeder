import React from 'react';
import { ScrollView } from 'react-native';
import moment, { Moment } from 'moment';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Loader, GenericError, LargeButton } from 'pet-feeder/src/components';
import { Record } from 'pet-feeder/src/types';
import theme from 'pet-feeder/src/theme';
import { computeDayHalf, dateToString } from 'pet-feeder/src/services';
import { showError } from 'pet-feeder/src/services/toaster';
import { navigator, PAGES } from 'pet-feeder/src/services/navigation';
import { usePet } from 'pet-feeder/src/hooks';
import { createRecord } from 'pet-feeder/src/graphql/mutations';
import { getDailyRecords } from 'pet-feeder/src/graphql/queries';
import { FeedPetButton } from '../FeedPetButton/FeedPetButton.component';
import { HalfDayCard } from './HalfDayCard';
import { ActivityCard } from './ActivityCard';
import { arrangeRecords } from './utils';

interface Props {
  selectedDate: Moment;
  tribeId: string;
}

export const DayScrollView: React.FC<Props> = ({ selectedDate, tribeId }: Props) => {
  const dayString = dateToString(selectedDate);
  const dayHalf = computeDayHalf(moment());

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
  const error = morningQueryResult.error || eveningQueryResult.error || petQueryResult.error;

  if (loading) return <Loader size={30} />;

  if (error) {
    return <GenericError />;
  }

  const records = arrangeRecords(
    morningQueryResult.data.dailyRecords,
    eveningQueryResult.data.dailyRecords
  );

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

    if (records.food[dayHalf].length === 0) {
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
        record={records.food.morning.filter((record: Record) => record.type === 'food')[0]}
      />
      <HalfDayCard
        halfDay={'evening'}
        pet={pet}
        record={records.food.evening.filter((record: Record) => record.type === 'food')[0]}
      />
      {records.others.map((record: Record) => {
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
            navigator.navigate(PAGES.CUSTOM_ACTIONS, { dayString, dayHalf });
          }}
        />
      )}
    </ScrollView>
  );
};
