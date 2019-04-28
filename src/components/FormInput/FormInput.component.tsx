import React, { Component, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import theme from '../../theme';

interface Props {
  label: string;
}

interface State {
  value: string;
}

export class FormInput extends Component<Props, State> {
  public state = { value: '' };
  public render(): ReactNode {
    const { label } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          label={label}
          value={this.state.value}
          onChangeText={text => this.setState({ value: text })}
          style={styles.inputStyle}
          theme={theme.material}
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
  },
});
