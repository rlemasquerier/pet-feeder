import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Card, UserPictureBadge } from 'pet-feeder/src/components';
import { getRecordHourFromTimestamp } from './utils';
import { Record } from 'pet-feeder/src/types/types';
import theme from 'pet-feeder/src/theme';

const PICTURE_BADGE_SIZE = 40;
const PICTURE_BADGE_MARGIN = 3 * theme.margins.unit;

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
    >
      <View style={styles.contentContainer}>
        {props.record && (
          <View style={{ width: PICTURE_BADGE_SIZE, marginHorizontal: PICTURE_BADGE_MARGIN }} />
        )}
        <Text style={styles.content}>
          {props.record
            ? `Gaïa a été nourrie par ${props.record.feederName}`
            : "Gaïa attend d'être nourrie"}
        </Text>
        {props.record && (
          <UserPictureBadge
            style={{ marginHorizontal: PICTURE_BADGE_MARGIN }}
            size={PICTURE_BADGE_SIZE}
            userId={props.record.feederId}
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
