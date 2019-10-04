import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';
import { Page, BarChart, FiguresDisplay, Loader } from '../../components';
import {
  AnimatedHeader,
  HEADER_DIMENSIONS,
} from 'pet-feeder/src/components/AnimatedHeader/AnimatedHeader';
import theme from './../../theme';
import { useQuery } from '@apollo/react-hooks';
import { User } from 'pet-feeder/src/types';

export const Statistics: React.FC<{}> = () => {
  const [scrollY] = useState<Animated.Value<number>>(new Animated.Value(0));
  const connectedUser = useQuery<{ me: User }>(getConnectedUser);
  if (!connectedUser || !connectedUser.data || !connectedUser.data.me) {
    return <Loader size={100} />;
  }
  const user = connectedUser.data.me;
  const figuresDisplayData = [
    { label: 'Repas', value: 38 },
    { label: 'Matins', value: 2 },
    { label: 'Soirs', value: 56 },
  ];
  return (
    <Page>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll({ y: scrollY })}
        contentContainerStyle={styles.content}
      >
        <FiguresDisplay data={figuresDisplayData} />
        <View style={styles.cardStyle}>
          <BarChart />
        </View>
        <FiguresDisplay
          data={[
            ...figuresDisplayData,
            { value: 12, label: 'Test' },
            { value: 3, label: 'Very long' },
          ]}
        />
        <FiguresDisplay data={figuresDisplayData} />
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
    paddingHorizontal: theme.margins.pagePadding,
  },
  cardStyle: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.border,
    marginTop: 4 * theme.margins.unit,
    paddingHorizontal: 4 * theme.margins.unit,
    paddingVertical: 2 * theme.margins.unit,
  },
});
