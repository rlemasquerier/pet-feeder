import React, { Component, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import theme from '../../theme';

export interface Props {
  type: string;
  label: string;
  name: string;
  onChange: () => void;
  onBlur: () => void;
  value: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
  secureTextEntry?: boolean;
}

interface State {
  value: string;
}

export class FormInput extends Component<Props, State> {
  public state = { value: '' };
  public render(): ReactNode {
    const { ...props } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          underlineColor={theme.colors.black}
          theme={theme.material}
          style={styles.inputStyle}
          {...props}
        />
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  inputStyle: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    alignItems: 'center',
    width: '70%',
    marginBottom: 3 * theme.margins.unit,
  },
  inputStyle: {
    width: '100%',
    backgroundColor: theme.colors.backgroundColor,
  },
});
