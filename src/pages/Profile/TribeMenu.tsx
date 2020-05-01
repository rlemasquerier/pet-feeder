import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import theme from 'pet-feeder/src/theme';
import { withMenuAnimation } from 'pet-feeder/src/hoc/PageWithAnimatedMenu/withMenuAnimation';

const d = Dimensions.get('window');
export const width = d.width * 0.75;
export const height = d.height * 0.5;

const Row = (props: { label: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{props.label}</Text>
  </View>
);

export const TribeMenu = withMenuAnimation(() => (
  <View style={styles.container}>
    <Image source={theme.images.profilePicturePlaceholder} style={styles.avatar} />
    <Text style={styles.title}>James Bond</Text>
    <Text style={styles.handle}>@jb</Text>
    <View style={styles.divider} />
    <View>
      <Row label="Tribe code: AZER" />
      <Row label="Your pet: Dingo" />
      <Row label="Sex: Male" />
    </View>
  </View>
));

const styles = StyleSheet.create({
  container: {
    width,
    height,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
