import React from 'react';
import { getRecordHourFromTimestamp, genderizeWord } from './utils';
import { Record, Pet } from 'pet-feeder/src/types';
import { ActivityCard } from '../ActivityCard';

interface Props {
  halfDay: 'morning' | 'evening';
  pet?: Pet;
  record?: Record;
}

// TODO: Duplicated code with ActivityCard. To refacto.

export const HalfDayCard: React.FC<Props> = (props: Props) => {
  const timeLabel = props.halfDay === 'morning' ? 'Ce matin' : 'Ce soir';
  const petSex = props.pet && props.pet.sex;

  return (
    <ActivityCard
      record={props.record}
      fallbackContent={`${props.pet && props.pet.name} attend d'être ${genderizeWord(
        'nourri',
        petSex
      )}`}
      fallbackTitle={timeLabel}
      customTitleExtractor={(record: Record) =>
        `${timeLabel} à ${getRecordHourFromTimestamp(record.timestamp)}`
      }
      customContentExtractor={(record: Record) =>
        `${props.pet && props.pet.name} a été ${genderizeWord('nourri', petSex)} par ${
          record.feederName
        }`
      }
    />
  );
};
