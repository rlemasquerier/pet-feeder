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
  record: Record;
}

export const ActivityCard: React.FC<Props> = (props: Props) => {
  const { record } = props;
  return (
    <Card
      title={`${getActivityName(record.type)} à ${getRecordHourFromTimestamp(
        props.record.timestamp
      )}`}
    >
      <View style={styles.contentContainer}>
        <View style={{ width: PICTURE_BADGE_SIZE, marginHorizontal: PICTURE_BADGE_MARGIN }} />
        <Text style={styles.content}>{`${record.feederName} ${getActivityText(record.type)}`}</Text>
        <UserPictureBadge
          style={{ marginHorizontal: PICTURE_BADGE_MARGIN }}
          size={PICTURE_BADGE_SIZE}
          userId={props.record.feederId}
        />
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
