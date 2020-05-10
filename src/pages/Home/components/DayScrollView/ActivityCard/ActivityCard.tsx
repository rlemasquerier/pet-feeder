import React from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import * as R from 'ramda';
import { useQuery } from 'react-apollo';
import theme from 'pet-feeder/src/theme';
import { Card, UserPictureBadge } from 'pet-feeder/src/components';
import { Record, CustomAction } from 'pet-feeder/src/types';
import { getRecordHourFromTimestamp } from '../HalfDayCard/utils';
import { getAvailableCustomActions } from 'pet-feeder/src/graphql/queries';

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

  const { data: customActionsData } = useQuery(getAvailableCustomActions);

  if (!customActionsData) {
    return null;
  }

  const normalizedCustomActions = R.indexBy<CustomAction>(
    R.prop<string>('name'),
    customActionsData.customActions
  );

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
    return `${
      normalizedCustomActions[record.type].displayedDescription
    } à ${getRecordHourFromTimestamp(record.timestamp)}`;
  };

  const getActivityContent = (): string => {
    if (!record) {
      return fallbackContent as string;
    }
    if (customContentExtractor) {
      return customContentExtractor(record);
    }
    return `${record.feederName} ${normalizedCustomActions[record.type].displayedInAction}`;
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
