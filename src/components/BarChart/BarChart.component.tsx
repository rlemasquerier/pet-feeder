import React, { Component, ReactNode } from 'react';
import { View, Text, ViewStyle, TextStyle, Dimensions, StyleSheet } from 'react-native';
import { BarChart as SVGBarChart } from 'react-native-svg-charts';
import { Text as SVGText } from 'react-native-svg';
import theme from './../../theme';

const HEIGHT = 300;

const CONTENT_PADDING = 4 * theme.margins.unit;
const LABEL_WIDTH = (Dimensions.get('window').width - 2 * CONTENT_PADDING) / 4;

interface DataPoint {
  user: string;
  count: number;
}

interface Props {
  data: DataPoint[];
}

export class BarChart extends Component<Props, {}> {
  public render(): ReactNode {
    const fill = theme.colors.primary;
    const data = this.props.data;
    const rawData = data.map(element => element.count);
    const axis = data.map(element => element.user);
    const CUT_OFF = 40;
    const Labels = ({
      x,
      y,
      bandwidth,
      data,
    }: {
      x: (point: number) => number;
      y: (point: number) => number;
      bandwidth: number;
      data: number[];
    }) =>
      data.map((value, index) => (
        <SVGText
          key={index}
          x={x(index) + bandwidth / 2}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={14}
          fill={value >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
        >
          {value}
        </SVGText>
      ));
    return (
      <View style={styles.container}>
        <SVGBarChart
          style={{ height: 200 }}
          data={rawData}
          svg={{ fill }}
          contentInset={{ top: 30, bottom: 30 }}
        >
          {/*
          // @ts-ignore */}
          <Labels />
        </SVGBarChart>
        <View style={styles.labelsContainer}>
          {axis.map(user => (
            <View key={user} style={styles.labelElementContainer}>
              <Text style={styles.labelElement}>{user}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  labelsContainer: ViewStyle;
  labelElementContainer: ViewStyle;
  labelElement: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: CONTENT_PADDING,
  },
  labelsContainer: {
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  labelElementContainer: {
    width: LABEL_WIDTH,
  },
  labelElement: {
    ...theme.fonts.small,
    alignSelf: 'center',
  },
});
