import React, { FunctionComponent, ReactElement } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from './selection.json';

export const IcomoonIcon = createIconSetFromIcoMoon(icomoonConfig);

export interface IconProps {
  name: IconName;
  color?: string;
  size: number;
  style?: StyleProp<TextStyle>;
}

export type IconName =
  | 'home3'
  | 'bell'
  | 'calendar'
  | 'user'
  | 'spoon-knife'
  | 'cross'
  | 'checkmark';

export const Icon: FunctionComponent<IconProps> = ({
  name,
  ...rest
}: IconProps): ReactElement<{}, string> => <IcomoonIcon name={name} {...rest} />;
