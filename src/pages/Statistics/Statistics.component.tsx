import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';
import {
  Page,
  BarChart,
  FiguresDisplay,
  Loader,
  Card,
  GenericError,
  UserPictureBadge,
} from 'pet-feeder/src/components';
import {
  AnimatedHeader,
  HEADER_DIMENSIONS,
} from 'pet-feeder/src/components/AnimatedHeader/AnimatedHeader';
import theme from 'pet-feeder/src/theme';
import { useQuery } from '@apollo/react-hooks';
import { getRecords } from 'pet-feeder/src/graphql/queries';
import { getUserRecordsStats, getAllUsersRecordsCount } from './utils';
import { Record } from 'pet-feeder/src/types';
import { useCurrentUser, useCurrentTribe } from 'pet-feeder/src/hooks';

export const Statistics: React.FC<{}> = () => {
  const [scrollY] = useState<Animated.Value<number>>(new Animated.Value(0));
  const { user, loading: loadingUser } = useCurrentUser();
  const records = useQuery<{ records: Record[] }>(getRecords);
  const { tribe } = useCurrentTribe(user && user.tribeMember[0]);
  if (loadingUser) {
    return <Loader size={100} />;
  }
  if (!user) {
    return <GenericError />;
  }
  const figuresDisplayData =
    records.data && records.data.records
      ? getUserRecordsStats(records.data.records.filter(record => record.feederId === user.id))
      : [];
  const recordsData =
    records.data && records.data.records
      ? getAllUsersRecordsCount(records.data && records.data.records)
      : [];
  return (
    <Page>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll({ y: scrollY })}
        contentContainerStyle={styles.content}
      >
        <Card title="Mes stats totales">
          <FiguresDisplay data={figuresDisplayData} />
        </Card>
        <Card title="Ma coloc">
          <View style={styles.cardStyle}>
            {recordsData.length > 0 && (
              <>
                <BarChart data={recordsData} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  {tribe &&
                    tribe.members.map(memberId => (
                      <UserPictureBadge key={memberId} userId={memberId} size={40} />
                    ))}
                </View>
              </>
            )}
          </View>
        </Card>
      </Animated.ScrollView>
      <AnimatedHeader
        scrollY={scrollY}
        title="Statistiques"
        subtitle={user.name}
        imageSource={
          user && user.profilePictureUrl
            ? {
                uri: user.profilePictureUrl,
              }
            : theme.images.profilePicturePlaceholder
        }
      />
    </Page>
  );
};

interface Style {
  content: ViewStyle;
  cardStyle: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  content: {
    alignItems: 'stretch',
    paddingTop: HEADER_DIMENSIONS.EXTENDED_HEIGHT,
    paddingBottom: 4 * theme.margins.unit,
  },
  cardStyle: {
    padding: 2 * theme.margins.unit,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
