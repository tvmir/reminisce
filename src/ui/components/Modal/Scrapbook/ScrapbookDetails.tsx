import React, { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import ScrapbookDetailsBackground from './ScrapbookDetailsBackground';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Ionicon = Animated.createAnimatedComponent(Ionicons);
const MaterialCommunityIcon = Animated.createAnimatedComponent(
  MaterialCommunityIcons
);

export default function ScrapbookDetails({ item }: any) {
  const animatedIndex = useSharedValue(0);
  const { width } = useWindowDimensions();

  // Animated styles
  const titleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.2],
      ['#ffffff', '#000000']
    ),
  }));

  const locationStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.2],
      ['#e0e0e0', '#686868']
    ),
  }));

  const heartStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.2],
      ['#ffffff', '#000000']
    ),
  }));

  return (
    <BottomSheet
      index={0}
      animatedIndex={animatedIndex}
      snapPoints={useMemo(() => ['20%', '80%'], [])}
      handleComponent={() => <View />}
      backgroundComponent={ScrapbookDetailsBackground}
    >
      <Animatable.View
        style={{ paddingVertical: 24, paddingHorizontal: 24 }}
        animation="fadeInUp"
        easing="ease-in-out"
        delay={300}
        duration={600}
      >
        <Animatable.View
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Animated.Text
            style={[{ fontSize: 32, fontWeight: 'bold' }, titleStyle]}
          >
            {item.name}
          </Animated.Text>
        </Animatable.View>
        <Animated.Text style={[{ fontSize: 12 }, locationStyle]}>
          {item.location}
        </Animated.Text>
        <Animatable.View
          style={{
            paddingVertical: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Ionicon
            style={[heartStyle]}
            name="md-heart-circle-sharp"
            size={50}
          />
          {/* <MaterialCommunityIcon
            style={[heartStyle]}
            name="message-outline"
            size={40}
          /> */}
        </Animatable.View>
      </Animatable.View>
      {/* </View> */}
    </BottomSheet>
  );
}
