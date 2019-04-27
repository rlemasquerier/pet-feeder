import React, { Component, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { FormInput } from '../../../components';
import theme from '../../../theme';

export class LoginForm extends Component<{}, {}> {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <FormInput label="Email" />
        <FormInput label="Password" />
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 3 * theme.margins.unit,
    paddingVertical: 2 * theme.margins.unit,
  },
});
