import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import {
  View,
  Text,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import * as Locaiton from 'expo-location';
import { LocationObject } from 'expo-location';
import { getDistance } from '../../../contexts/services/scrapbook';

// constants
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.65;
const SPACING = width * 0.15;

interface MapCardProps {
  user: DocumentData | undefined;
  scrapbooks: DocumentData | undefined;
  scrollX: Animated.Value<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
  navigation: any;
}

export default function MapCard({
  user,
  scrapbooks,
  scrollX,
  scrollRef,
  navigation,
}: MapCardProps) {
  const [location, setLocation] = useState<LocationObject>();

  useEffect(() => {
    (async () => {
      let { status } = await Locaiton.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Locaiton.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, [location]);

  // Getting the coordinates of the scrapbooks and setting them as markers
  const coordinates = scrapbooks?.map((marker: any) => {
    return {
      latitude: marker.location.lat,
      longitude: marker.location.lng,
    };
  });

  // Getting the coordinates of the user
  const currCoordinates = {
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
  };

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
      {scrapbooks?.map((item: DocumentData, index: number) => (
        <>
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Scrapbook', { item })}
            style={{
              backgroundColor: '#000000',
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
              marginHorizontal: 10,
              height: 110,
              width: CARD_WIDTH + 3,
              overflow: 'hidden',
              flexDirection: 'row',
            }}
          >
            <SharedElement
              style={{ flex: 3, opacity: 0.9 }}
              id={`${item?.id}.images`}
            >
              <Image
                source={{ uri: item?.images[0] }}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </SharedElement>
            <View style={{ padding: 8, paddingTop: 25, flex: 1.5 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#d3d6d9',
                }}
              >
                {item?.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontSize: 12, color: '#8e8e8e', marginTop: 2 }}
              >
                @{user![index].username}
              </Text>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  fontSize: 12,
                  color: '#8e8e8e',
                  marginTop: 28,
                  paddingLeft: 30,
                }}
              >
                {location !== undefined
                  ? (
                      getDistance(currCoordinates, coordinates![index]) *
                      1.609344
                    ).toFixed(2)
                  : 'Loading...'}{' '}
                km
              </Text>
            </View>
          </TouchableOpacity>
        </>
      ))}
    </Animated.ScrollView>
  );
}

// getDistance(currCoordinates, coordinates![0]) * 1609.344
