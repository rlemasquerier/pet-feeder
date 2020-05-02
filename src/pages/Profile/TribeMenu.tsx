import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import theme from 'pet-feeder/src/theme';
import { withMenuAnimation } from 'pet-feeder/src/hoc/PageWithAnimatedMenu/withMenuAnimation';

const Row = (props: { label: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{props.label}</Text>
  </View>
);

export const TribeMenu = withMenuAnimation(() => (
  <>
    <Image source={theme.images.profilePicturePlaceholder} style={styles.avatar} />
    <Text style={styles.title}>James Bond</Text>
    <Text style={styles.handle}>@jb</Text>
    <View style={styles.divider} />
    <View>
      <Row label="Tribe code: AZER" />
      <Row label="Your pet: Dingo" />
      <Row label="Sex: Male" />
    </View>
  </>
));

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
