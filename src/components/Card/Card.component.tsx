import React, { Component, ReactNode } from 'react';
import { Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import theme from '../../theme';

const TITLE_HEIGHT = 30;
const CARD_HEIGHT = 103;

interface Props {
  title: string;
  content: string;
}

export class Card extends Component<Props> {
  public render(): ReactNode {
    const { title, content } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  titleContainer: ViewStyle;
  contentContainer: ViewStyle;
  title: TextStyle;
  content: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    marginVertical: 2 * theme.margins.unit,
    marginHorizontal: theme.margins.pagePadding,
    height: CARD_HEIGHT,
    borderRadius: theme.borders.radius,
    backgroundColor: theme.colors.white,
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
    flex: 1,
    borderBottomLeftRadius: theme.borders.radius,
    borderBottomRightRadius: theme.borders.radius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  title: {
    ...theme.fonts.strong,
    color: theme.colors.white,
  },
  content: {
    ...theme.fonts.regular,
  },
});
