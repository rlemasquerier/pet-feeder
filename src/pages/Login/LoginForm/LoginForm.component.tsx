import React, { Component, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { FormInput, Button } from '../../../components';
import theme from '../../../theme';

export interface Values {
  email: string;
  password: string;
}
interface Props {
  handleSubmit: () => void;
  values: Values;
}
export class LoginForm extends Component<Props, {}> {
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <FormInput label="Email" />
        <FormInput label="Password" secureTextEntry />
        <Button label="Se connecter" onPress={this.props.handleSubmit} />
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
