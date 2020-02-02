import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { FormInput, Button, BinarySwitch } from '../../../../components';
import theme from '../../../../theme';

export interface Values {
  name: string;
  petName: string;
  petSex: string;
}
export interface Props {
  handleSubmit: () => void;
  handleChange: () => void;
  handleBlur: () => void;
  values: Values;
  isSubmitting: boolean;
}
export const CreateTribeForm: React.FC<Props> = (props: Props) => {
  const { values, handleChange, handleBlur, handleSubmit, isSubmitting } = props;
  return (
    <View style={styles.container}>
      <FormInput
        type="text"
        label="Nom de ta coloc"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      <FormInput
        type="text"
        label="Nom de ton animal"
        name="petName"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.petName}
      />
      <BinarySwitch
        choice1={{ label: 'Mâle', value: 'male' }}
        choice2={{ label: 'Femelle', value: 'female' }}
        name="petSex"
        type="text"
        value={values.petSex}
      />
      <Button isLoading={isSubmitting} label="Créer la coloc" onPress={handleSubmit} />
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
