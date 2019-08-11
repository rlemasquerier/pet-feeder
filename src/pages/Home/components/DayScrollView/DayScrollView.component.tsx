import React from 'react';
import { ScrollView } from 'react-native';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FeedPetButton } from '../FeedPetButton/FeedPetButton.component';
import { Card, Loader } from '../../../../components';

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
  dayString: string;
}

export const DayScrollView: React.FC<Props> = ({ dayString }: Props) => {
  const morningQueryResult = useQuery(GET_DAILY_RECORDS, {
    variables: { dateString: dayString, dayHalf: 'morning' },
    pollInterval: 300000,
  });

  const eveningQueryResult = useQuery(GET_DAILY_RECORDS, {
    variables: { dateString: dayString, dayHalf: 'afternoon' },
    pollInterval: 300000,
  });

  const [addRecord] = useMutation(ADD_RECORD);

  const loading = morningQueryResult.loading || eveningQueryResult.loading;
  const morningData = morningQueryResult.data;
  const eveningData = eveningQueryResult.data;

  if (loading) return <Loader size={30} />;

  return (
    <ScrollView>
      <Card
        title={'Ce matin'}
        content={
          morningData.dailyRecords && morningData.dailyRecords.length > 0
            ? `Gaïa a été nourrie par ${morningData.dailyRecords[0].feederName}`
            : "Gaïa attend d'être nourrie"
        }
      />
      <Card
        title={'Ce soir'}
        content={
          eveningData.dailyRecords && eveningData.dailyRecords.length > 0
            ? `Gaïa a été nourrie par ${eveningData.dailyRecords[0].feederName}`
            : "Gaïa attend d'être nourrie"
        }
      />
      <FeedPetButton
        onPress={() => {
          addRecord();
          morningQueryResult.refetch();
          eveningQueryResult.refetch();
        }}
        status={'active'}
      />
    </ScrollView>
  );
};
