import React from 'react';
import { useWindowDimensions, Image } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';

interface ImageItemsProps {
  scrollY: any;
  item: any;
  index: number;
  id: any;
}

export default function ImageItems({
  scrollY,
  item,
  index,
  id,
}: ImageItemsProps) {
  const { width, height } = useWindowDimensions();
  const MAX_HEIGHT = height / 1.8;
  const MIN_HEIGHT = 140;

  const imageHeight = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
      [MIN_HEIGHT, MAX_HEIGHT],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <>
      {!index ? (
        <Animated.View style={[{ width, height: MIN_HEIGHT }, imageHeight]}>
          <SharedElement
            id={`${id}.images`}
            style={{
              width: undefined,
              height: MAX_HEIGHT,
            }}
          >
            <Image
              source={{ uri: item }}
              style={{
                width: undefined,
                height: MAX_HEIGHT,
              }}
            />
          </SharedElement>
        </Animated.View>
      ) : (
        <Animated.View style={[{ width, height: MIN_HEIGHT }, imageHeight]}>
          <Animatable.Image
            animation={'fadeInUp'}
            easing="ease-in-out"
            delay={300}
            duration={500}
            source={{ uri: item }}
            style={{
              width: undefined,
              height: MAX_HEIGHT,
            }}
          />
        </Animated.View>
      )}
    </>
  );
}
