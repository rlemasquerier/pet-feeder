import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import theme from 'pet-feeder/src/theme';
import { withMenuAnimation } from 'pet-feeder/src/hoc/PageWithAnimatedMenu/withMenuAnimation';
import { useCurrentTribe, useCurrentUser } from 'pet-feeder/src/hooks';
import { Loader, GenericError } from 'pet-feeder/src/components';
import { Sex } from 'pet-feeder/src/types';

const petGenderTranslator = (gender: Sex) => {
  switch (gender) {
    case 'female':
      return 'Femelle';
    case 'male':
      return 'Mâle';
    default:
      return 'Non renseigné';
  }
};

const Row = (props: { label: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{props.label}</Text>
  </View>
);

export const TribeMenu = withMenuAnimation(() => {
  const { user, loading: loadingUser, error: errorUser } = useCurrentUser();
  const { tribe, loading: loadingTribe, error: errorTribe } = useCurrentTribe(
    user && user.tribeMember[0]
  );
  if (loadingUser || loadingTribe) {
    return <Loader size={30} />;
  }
  if (errorUser || errorTribe || !tribe) {
    return <GenericError />;
  }
  return (
    <>
      <View style={styles.avatar}>
        <Image source={theme.images.greyCat} />
      </View>
      <Text style={styles.title}>{tribe.name}</Text>
      <View style={styles.divider} />
      <View>
        <Row label={`Animal: ${tribe.pet.name}`} />
        <Row label={`Genre: ${petGenderTranslator(tribe.pet.sex)}`} />
        <Row label="Générer un code" />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
  },
  avatar: {
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 16,
  },
  handle: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: '#D8DAE0',
    width: '100%',
    marginVertical: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});