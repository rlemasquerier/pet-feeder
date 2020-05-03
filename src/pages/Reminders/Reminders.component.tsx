import React, { useState } from 'react';
import { Text, TextStyle, StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';
import CheckBox from 'react-native-check-box';
import { Page, Loader } from '../../components';
import {
  AnimatedHeader,
  HEADER_DIMENSIONS,
} from 'pet-feeder/src/components/AnimatedHeader/AnimatedHeader';
import theme from './../../theme';
import { useCurrentUser } from 'pet-feeder/src/hooks';
import { getAvailableCustomActions } from 'pet-feeder/src/graphql/queries';
import { useQuery } from 'react-apollo';
import { CustomAction } from 'pet-feeder/src/types';

export const Reminders: React.FC<{}> = () => {
  const [scrollY] = useState<Animated.Value<number>>(new Animated.Value(0));
  const [notificationsAllowed, setNotificationsAllowed] = useState<boolean>(true);
  const { user } = useCurrentUser();
  const { data: customActionsData } = useQuery(getAvailableCustomActions);
  const availableCustomActions = customActionsData && customActionsData.customActions;

  if (!user) {
    return <Loader size={100} />;
  }
  return (
    <Page>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll({ y: scrollY })}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.text}>Mes Rappels</Text>
        <CheckBox
          style={styles.checkboxContainer}
          onClick={() => {
            setNotificationsAllowed(!notificationsAllowed);
          }}
          checkBoxColor={theme.colors.secondaryAction}
          isChecked={notificationsAllowed}
          leftTextStyle={styles.checkboxText}
          leftText={'Recevoir une notifications lorsque mon chat a été nourri.e'}
        />
        <Text style={styles.text}>Mes Autres Actions</Text>
        {availableCustomActions &&
          availableCustomActions.map((customAction: CustomAction) => (
            <CheckBox
              key={customAction.name}
              style={styles.checkboxContainer}
              onClick={() => {}}
              checkBoxColor={theme.colors.secondaryAction}
              isChecked={notificationsAllowed}
              leftTextStyle={styles.checkboxText}
              leftText={customAction.name}
            />
          ))}
      </Animated.ScrollView>
      <AnimatedHeader
        scrollY={scrollY}
        title="Rappels"
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
  container: ViewStyle;
  text: TextStyle;
  checkboxContainer: ViewStyle;
  checkboxText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    alignItems: 'stretch',
    paddingTop: HEADER_DIMENSIONS.EXTENDED_HEIGHT,
    paddingBottom: 4 * theme.margins.unit,
    paddingHorizontal: theme.margins.pagePadding,
  },
  text: {
    ...theme.fonts.regular,
    marginTop: 2 * theme.margins.unit,
    fontSize: 20,
    paddingVertical: 3 * theme.margins.unit,
  },
  checkboxContainer: {
    flex: 1,
    paddingVertical: 2 * theme.margins.unit,
    borderBottomWidth: 1,
  },
  checkboxText: {
    color: theme.colors.text,
    marginRight: 4 * theme.margins.unit,
  },
});
