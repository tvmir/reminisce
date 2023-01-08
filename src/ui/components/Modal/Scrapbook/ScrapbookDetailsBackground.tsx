import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function ScrapbookDetailsBackground({
  animatedIndex,
  style,
}: any) {
  const containerStyle = useAnimatedStyle(() => ({
    ...style,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    opacity: interpolate(animatedIndex.value, [0, 0.2], [0, 1], 'clamp'),
  }));
  return <Animated.View style={containerStyle} />;
}
