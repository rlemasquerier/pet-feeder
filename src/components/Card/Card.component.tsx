import React, { Component, ReactNode } from 'react';
import { Text, StyleSheet, View, ViewStyle } from 'react-native';
import theme from '../../theme';

const TITLE_HEIGHT = 40;

export class Card extends Component {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text>Titre</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text>Contenu</Text>
        </View>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  titleContainer: ViewStyle;
  contentContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    margin: 3,
    height: 140,
    borderRadius: theme.borders.radius,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    ...theme.borders.shadow,
  },
  titleContainer: {
    height: TITLE_HEIGHT,
    borderTopLeftRadius: theme.borders.radius,
    borderTopRightRadius: theme.borders.radius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  contentContainer: {
    borderBottomLeftRadius: theme.borders.radius,
    borderBottomRightRadius: theme.borders.radius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
