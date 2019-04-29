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
  handleChange: () => void;
  handleBlur: () => void;
  values: Values;
}
export class LoginForm extends Component<Props, {}> {
  public render(): ReactNode {
    const { values, handleChange, handleBlur } = this.props;
    return (
      <View style={styles.container}>
        <FormInput
          type="email"
          label="Email"
          name="email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        <FormInput
          type="password"
          label="Mot de passe"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          secureTextEntry
        />
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
