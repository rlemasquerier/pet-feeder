import React, { Component, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { FormInput, Button } from '../../../components';
import theme from '../../../theme';

interface Props {
  onSubmit: () => void;
}
export class LoginForm extends Component<Props, {}> {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <FormInput label="Email" />
        <FormInput label="Password" secureTextEntry />
        <Button label="Se connecter" onPress={this.props.onSubmit} />
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
