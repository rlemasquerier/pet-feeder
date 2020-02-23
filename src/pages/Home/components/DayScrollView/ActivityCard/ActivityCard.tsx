import React from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import theme from 'pet-feeder/src/theme';
import { Card, UserPictureBadge } from 'pet-feeder/src/components';
import { Record } from 'pet-feeder/src/types';
import { getActivityName, getActivityText } from './utils';
import { getRecordHourFromTimestamp } from '../HalfDayCard/utils';

const PICTURE_BADGE_SIZE = 40;
const PICTURE_BADGE_MARGIN = 3 * theme.margins.unit;

interface Props {
  record?: Record;
  customTitleExtractor?: (record: Record) => string;
  customContentExtractor?: (record: Record) => string;
  fallbackTitle?: string;
  fallbackContent?: string;
}

export const ActivityCard: React.FC<Props> = (props: Props) => {
  const {
    record,
    fallbackTitle,
    fallbackContent,
    customContentExtractor,
    customTitleExtractor,
  } = props;

  if (!record && !fallbackTitle) {
    return null;
  }

  const getActivityTitle = (): string => {
    if (!record) {
      return fallbackTitle as string;
    }
    if (customTitleExtractor) {
      return customTitleExtractor(record);
    }
    return `${getActivityName(record.type)} à ${getRecordHourFromTimestamp(record.timestamp)}`;
  };

  const getActivityContent = (): string => {
    if (!record) {
      return fallbackContent as string;
    }
    if (customContentExtractor) {
      return customContentExtractor(record);
    }
    return `${record.feederName} ${getActivityText(record.type)}`;
  };

  return (
    <Card title={getActivityTitle()}>
      <View style={styles.contentContainer}>
        {record && (
          <View style={{ width: PICTURE_BADGE_SIZE, marginHorizontal: PICTURE_BADGE_MARGIN }} />
        )}

        <Text style={styles.content}>{getActivityContent()}</Text>
        {record && (
          <UserPictureBadge
            style={{ marginHorizontal: PICTURE_BADGE_MARGIN }}
            size={PICTURE_BADGE_SIZE}
            userId={record.feederId}
          />
        )}
      </View>
    </Card>
  );
};

interface Style {
  content: TextStyle;
  contentContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  content: {
    ...theme.fonts.regular,
    flex: 1,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
