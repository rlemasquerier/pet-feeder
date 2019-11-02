import {
  Platform,
  KeyboardAvoidingView as ReactKeyboardAvoidingView,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface Props {
  style: ViewStyle;
  children?: React.ReactNode;
}

export const KeyboardAvoidingView: React.FC<Props> = (props: Props) => {
  const behavior = Platform.OS == 'ios' ? 'padding' : undefined;
  return (
    <ReactKeyboardAvoidingView style={props.style} behavior={behavior} enabled>
      {props.children}
    </ReactKeyboardAvoidingView>
  );
};
