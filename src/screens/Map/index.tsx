import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { mapNightTheme, mapDarkTheme } from '../../ui/shared/MapTheme';
import * as Locaiton from 'expo-location';
import { markers } from './mockData';
import Animated, { call, useCode, Extrapolate } from 'react-native-reanimated';
// @ts-ignore
import nearBy from '../../../assets/gray_i.png';
// @ts-ignore
import current from '../../../assets/curr_i.png';
import { Dimensions, Image, Platform, Text, View } from 'react-native';

// constants
const nearByIndicator = Image.resolveAssetSource(nearBy).uri;
const currentIndicator = Image.resolveAssetSource(current).uri;
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.65;
const SPACING = width * 0.15;

export default function Map() {
  const [location, setLocation] = useState<any>(null);
  const [markerState, setMarkerState] = useState(markers);
  const mapRef = useRef<any>(null);
  const scrollViewRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  let scrollIndex = 0;

  // Getting the users' current location
  useEffect(() => {
    (async () => {
      let { status } = await Locaiton.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Locaiton.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log('LOCATION: ');
      console.log(currentLocation);
    })();
  }, []);

  // Setting the markers on the map based on the scrapbook's location
  useCode(() => {
    return call([scrollX], ([value]) => {
      let index = Math.floor(value / CARD_WIDTH + 0.2);
      if (index >= markerState.length) index = markerState.length - 1;
      if (index <= 0) index = 0;

      // @ts-ignore
      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (scrollIndex !== index) {
          scrollIndex = index;
          const { coordinates } = markerState[index];
          mapRef?.current?.animateToRegion(
            {
              ...coordinates,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            },
            300
          );
        }
      }, 10);
    });
  }, [scrollX]);

  // const interpolations = markerState.map((marker, index) => {
  //   const inputRange = [
  //     (index - 1) * CARD_WIDTH,
  //     index * CARD_WIDTH,
  //     (index + 1) * CARD_WIDTH,
  //   ];

  //   const scale = scrollX.interpolate({
  //     inputRange,
  //     outputRange: [1, 1.2, 1],
  //     extrapolate: Extrapolate.CLAMP,
  //   });

  //   const color = scrollX.interpolate({
  //     inputRange,
  //     outputRange: ['#934c4c', '#6cb4bc', '#000'],
  //     extrapolate: Extrapolate.CLAMP,
  //   });

  //   return { scale, color };
  // });

  const onMarkerPress = (mapEventData: any) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING;
    }

    scrollViewRef.current.scrollTo({ x: x, y: 0, animated: true });
  };

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapDarkTheme}
        initialRegion={{
          latitude: location?.coords.latitude
            ? location?.coords.latitude
            : 25.098960013248654,
          longitude: location?.coords.longitude
            ? location?.coords.longitude
            : 55.17555855061869,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        // showsMyLocationButton
        style={{ flex: 1 }}
      >
        {markerState.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={marker.coordinates}
              onPress={(sb) => onMarkerPress(sb)}
            >
              <Animated.View>
                {/* TODO: Fix markers */}
                {!index ? (
                  <Animated.Image
                    style={[
                      {
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30,
                      },
                    ]}
                    resizeMode="cover"
                    source={{
                      uri: currentIndicator,
                    }}
                  />
                ) : (
                  <Animated.Image
                    style={[
                      {
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30,
                      },
                    ]}
                    resizeMode="cover"
                    source={{
                      uri: nearByIndicator,
                    }}
                  />
                )}
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>

      <Animated.ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
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
        {markerState.map((marker, index) => (
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
              // flexDirection: 'row',
              // alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: marker.image }}
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
                {marker.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontSize: 12, color: '#8e8e8e' }}
              >
                @{marker.user}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}
