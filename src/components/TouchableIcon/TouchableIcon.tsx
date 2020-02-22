import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'pet-feeder/src/components';
import { IconName } from '../Icon/Icon.component';

interface Props {
  color: string;
  size: number;
  name: IconName;
  onPress: () => {};
}

export const TouchableIcon: React.FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      <Icon name={props.name} size={props.size} color={props.color} />
    </TouchableOpacity>
  );
};
