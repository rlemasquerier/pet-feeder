import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { FormInput, Button } from '../../../components';
import theme from '../../../theme';

export interface Values {
  name: string;
  password: string;
}
export interface Props {
  handleSubmit: () => void;
  handleChange: () => void;
  handleBlur: () => void;
  values: Values;
  isSubmitting: boolean;
}
export const JoinTribeForm: React.FC<Props> = (props: Props) => {
  const { values, handleChange, handleBlur, isSubmitting, handleSubmit } = props;
  return (
    <View style={styles.container}>
      <FormInput
        type="text"
        label="Nom de la coloc"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      <FormInput
        type="password"
        label="Mot de passe de la coloc"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        secureTextEntry
      />
      <Button isLoading={isSubmitting} label="Rejoindre la coloc" onPress={handleSubmit} />
    </View>
  );
};

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
