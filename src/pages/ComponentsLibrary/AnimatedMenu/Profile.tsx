import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { alpha, perspective } from './Constants';
import { Content, width } from './Content';

const MIN = ((-4 * width) / Math.PI) * alpha;
const MAX = 0;

interface ProfileProps {
  open: boolean;
  onPress: () => void;
}

export const Profile = ({ open, onPress }: ProfileProps) => {
  const translateX = open ? MAX : MIN;
  return (
    <View
      style={{
        transform: [perspective, { translateX }],
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Content />
      </TouchableOpacity>
    </View>
  );
};
