import { RecordType, Activity } from 'pet-feeder/src/types';

const activityMapper: { [key in RecordType | 'default']: Activity } = {
  litter: {
    activityName: 'Litière',
    activityText: 'a nettoyé la litière',
  },
  food: {
    activityName: 'Nourriture',
    activityText: 'a donné à manger',
  },
  default: {
    activityName: 'Activité',
    activityText: 'a réalisé une activité',
  },
};

const activitySelector = (keyToSelect: 'activityName' | 'activityText') => (
  activityType: RecordType
): string => {
  if (!Object.keys(activityMapper).includes(activityType)) {
    return activityMapper.default[keyToSelect];
  }
  return activityMapper[activityType][keyToSelect];
};

export const getActivityName = activitySelector('activityName');

export const getActivityText = activitySelector('activityText');
