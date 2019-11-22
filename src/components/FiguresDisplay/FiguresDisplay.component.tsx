import React, { Component, ReactNode } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import theme from './../../theme';

interface DataItem {
  label: string;
  value: number;
}

interface Props {
  data: DataItem[];
}

export class FiguresDisplay extends Component<Props, {}> {
  public render(): ReactNode {
    if (!this.props.data || this.props.data.length === 0) {
      return null;
    }
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {this.props.data.map(
          (item: DataItem, index: number): ReactNode => (
            <View key={item.label} style={[styles.container, index > 0 && { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>{item.value}</Text>
              <Text style={styles.text}>{item.label}</Text>
            </View>
          )
        )}
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  text: {
    ...theme.fonts.regular,
    marginVertical: theme.margins.unit,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.border,
    paddingHorizontal: theme.margins.unit,
    paddingVertical: 2 * theme.margins.unit,
  },
});
