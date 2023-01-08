import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ImageItems from './ImageItems';

// constants
const { height } = Dimensions.get('window');
const MAX_HEIGHT = height / 1.8;
const DOT_SIZE = 4;
const DOT_SPACING = 4;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

export default function ScrapbookImageList({ images, id }: any) {
  const scrollY = useRef(useSharedValue(0)).current;

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y: value } }) => {
      scrollY.value = value;
    },
  });

  const translateIndicator = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, MAX_HEIGHT],
          [0, DOT_INDICATOR_SIZE * 1.5]
        ),
      },
    ],
  }));

  return (
    <>
      <Animated.FlatList
        data={images}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        snapToInterval={MAX_HEIGHT}
        decelerationRate="fast"
        bounces={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ height: (images.length + 1) * MAX_HEIGHT }}
        renderItem={({ item, index }) => (
          <ImageItems scrollY={scrollY} item={item} index={index} id={id} />
        )}
      />
      {images.length > 1 && (
        <View style={{ position: 'absolute', top: MAX_HEIGHT / 1.8, right: 8 }}>
          {images.map((_: any, index: number) => {
            return (
              <View
                key={index}
                style={{
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  borderRadius: DOT_SIZE,
                  backgroundColor: '#ffffff',
                  margin: DOT_SPACING,
                }}
              />
            );
          })}
          <Animated.View
            style={[
              {
                width: DOT_INDICATOR_SIZE,
                height: DOT_INDICATOR_SIZE,
                borderRadius: DOT_INDICATOR_SIZE,
                borderWidth: 1,
                borderColor: '#ffffff',
                position: 'absolute',
                top: DOT_SIZE / 2,
                right: DOT_SIZE / 2,
              },
              translateIndicator,
            ]}
          />
        </View>
      )}
    </>
  );
}
