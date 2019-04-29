import { handleTextInput } from 'react-native-formik';
import { compose } from 'recompose';
import { FormInput, Props } from './FormInput.component';

export const FormInputContainer = compose<Props, Props>(handleTextInput)(FormInput);
