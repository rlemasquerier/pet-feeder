import React from 'react';
import { Card } from '../../../../../components';
import { getRecordHourFromTimestamp } from './utils';
import { Record } from '../../../../../types/types';

interface Props {
  halfDay: 'morning' | 'evening';
  record?: Record;
}

export const HalfDayCard: React.FC<Props> = (props: Props) => {
  const timeLabel = props.halfDay === 'morning' ? 'Ce matin' : 'Ce soir';
  return (
    <Card
      title={
        props.record
          ? `${timeLabel} à ${getRecordHourFromTimestamp(props.record.timestamp)}`
          : timeLabel
      }
      content={
        props.record
          ? `Gaïa a été nourrie par ${props.record.feederName}`
          : "Gaïa attend d'être nourrie"
      }
    />
  );
};
