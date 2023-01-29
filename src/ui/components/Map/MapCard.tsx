import React from 'react';
import { DocumentData } from 'firebase/firestore';
import { View, Text, Dimensions, Platform, Image } from 'react-native';
import Animated from 'react-native-reanimated';

// constants
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.65;
const SPACING = width * 0.15;

interface MapCardProps {
  user: DocumentData | undefined;
  scrapbooks: DocumentData | undefined;
  scrollX: Animated.Value<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
}

export default function MapCard({
  user,
  scrapbooks,
  scrollX,
  scrollRef,
}: MapCardProps) {
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      ref={scrollRef}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={1}
      snapToInterval={CARD_WIDTH + 20}
      snapToAlignment="center"
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      contentInset={{
        top: 0,
        left: SPACING,
        bottom: 0,
        right: SPACING,
      }}
      contentContainerStyle={{
        paddingHorizontal: Platform.OS === 'android' ? SPACING : 0,
      }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
      }}
    >
      {scrapbooks?.map((item: DocumentData, index: number) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: '#000000',
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
              marginHorizontal: 10,
              height: 140,
              width: CARD_WIDTH,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: item?.images[0] }}
              resizeMode="cover"
              style={{
                flex: 5,
                width: '100%',
                height: '100%',
              }}
            />
            <View style={{ padding: 10 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#d3d6d9',
                }}
              >
                {item?.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontSize: 12, color: '#8e8e8e' }}
              >
                @{user![index].username}
              </Text>
            </View>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
}
