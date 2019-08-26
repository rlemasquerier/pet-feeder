import React from 'react';
import { ScrollView } from 'react-native';
import moment, { Moment } from 'moment';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FeedPetButton } from '../FeedPetButton/FeedPetButton.component';
import { Loader } from '../../../../components';
import { HalfDayCard } from './HalfDayCard';
import { computeDayHalf, dateToString } from '../../../../services';

const GET_DAILY_RECORDS = gql`
  query dailyRecords($dateString: String!, $dayHalf: String) {
    dailyRecords(input: { dateString: $dateString, dayHalf: $dayHalf }) {
      id
      feederId
      feederName
      timestamp
    }
  }
`;

const ADD_RECORD = gql`
  mutation createRecord {
    createRecord {
      id
    }
  }
`;

interface Props {
  selectedDate: Moment;
}

export const DayScrollView: React.FC<Props> = ({ selectedDate }: Props) => {
  const dayString = dateToString(selectedDate);
  const morningQueryResult = useQuery(GET_DAILY_RECORDS, {
    variables: { dateString: dayString, dayHalf: 'morning' },
    pollInterval: 300000,
  });

  const eveningQueryResult = useQuery(GET_DAILY_RECORDS, {
    variables: { dateString: dayString, dayHalf: 'afternoon' },
    pollInterval: 300000,
  });

  const [addRecord, addRecordMutationResult] = useMutation(ADD_RECORD);

  const addRecordLoading = addRecordMutationResult.loading;
  const loading = morningQueryResult.loading || eveningQueryResult.loading;
  const error = morningQueryResult.error;

  if (loading) return <Loader size={30} />;

  // TODO: Handle this case with a placeholder
  if (error) return <Loader size={30} />;

  const records = {
    morning: morningQueryResult.data.dailyRecords,
    evening: eveningQueryResult.data.dailyRecords,
  };

  const getButtonStatus = () => {
    const now = moment();
    const yesterday = moment().subtract(1, 'day');
    const engagementDate = now.hour() < 3 ? yesterday : now;
    const isToday = engagementDate.isSame(selectedDate, 'days');
    if (!isToday) {
      return 'invisible';
    }
    const dayHalf = computeDayHalf(moment());

    if (records[dayHalf].length === 0) {
      return 'active';
    }
    return 'inactive';
  };

  return (
    <ScrollView>
      <HalfDayCard halfDay={'morning'} record={records.morning[0]} />
      <HalfDayCard halfDay={'evening'} record={records.evening[0]} />
      <FeedPetButton
        onPress={async () => {
          await addRecord();
          morningQueryResult.refetch();
          eveningQueryResult.refetch();
        }}
        status={getButtonStatus()}
        loading={addRecordLoading}
      />
    </ScrollView>
  );
};
