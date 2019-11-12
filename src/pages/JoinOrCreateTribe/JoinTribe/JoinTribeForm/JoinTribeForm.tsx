import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { FormInput, Button } from '../../../../components';
import theme from '../../../../theme';

export interface Values {
  code: string;
}
export interface Props {
  handleSubmit: () => void;
  handleChange: () => void;
  handleBlur: () => void;
  values: Values;
  isSubmitting: boolean;
}
export const JoinTribeForm: React.FC<Props> = (props: Props) => {
  const { values, handleChange, handleBlur, handleSubmit } = props;
  return (
    <View style={styles.container}>
      <FormInput
        type="text"
        label="Code de la coloc"
        name="code"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.code}
      />
      <Button isLoading={false} label="Rejoindre la coloc" onPress={handleSubmit} />
    </View>
  );
};

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    alignItems: 'center',
    marginVertical: 3 * theme.margins.unit,
    paddingVertical: 2 * theme.margins.unit,
  },
});
