import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { mapNightTheme, mapDarkTheme } from '../../ui/shared/MapTheme';
import * as Locaiton from 'expo-location';
import Animated, { call, useCode } from 'react-native-reanimated';
// @ts-ignore
import nearBy from '../../../assets/gray_i.png';
// @ts-ignore
import current from '../../../assets/curr_i.png';
import { Dimensions, Image, LogBox, Platform, Text, View } from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
  useUserQuery,
} from '../../utils/hooks';
import MapCard from '../../ui/components/Map/MapCard';
import { fetchScrapbooks } from '../../contexts/slices/scrapbooks/scrapbooksSlice';

// constants
const nearByIndicator = Image.resolveAssetSource(nearBy).uri;
const currentIndicator = Image.resolveAssetSource(current).uri;
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.65;
const SPACING = width * 0.15;

export default function Map() {
  const [location, setLocation] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const scrollViewRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  let scrollIndex = 0;
  const dispatch = useAppDispatch();
  const scrapbook = useAppSelector((state) => state.scrapbooks.scrapbooks);

  useEffect(() => {
    dispatch(fetchScrapbooks());
  }, []);

  const user = scrapbook?.map((_: any, index: any) => {
    return useUserQuery(scrapbook[index]?.uid).data;
  });

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
      // console.log('LOCATION: ');
      // console.log(currentLocation);
    })();
  }, []);

  // Getting the coordinates of the scrapbooks and setting them as markers
  const coordinates = scrapbook?.map((marker) => {
    return {
      latitude: marker.location.lat,
      longitude: marker.location.lng,
    };
  });

  // Setting the markers on the map based on the scrapbook's location
  useCode(() => {
    return call([scrollX], ([value]) => {
      let index = Math.floor(value / CARD_WIDTH + 0.2);
      if (index >= scrapbook?.length!) index = scrapbook?.length! - 1;
      if (index <= 0) index = 0;

      // @ts-ignore
      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (scrollIndex !== index) {
          scrollIndex = index;
          const coords = coordinates![index];
          mapRef?.current?.animateToRegion(
            {
              ...coords,
              latitudeDelta: 0.06,
              longitudeDelta: 0.06,
            },
            300
          );
        }
      }, 10);
    });
  }, [scrollX]);

  const onMarkerPress = (mapEventData: any) => {
    const id = mapEventData._targetInst.return.key;
    let x = id * CARD_WIDTH + id * 20;

    if (Platform.OS === 'ios') x = x - SPACING;
    scrollViewRef.current.scrollTo({ x: x, y: 0, animated: true });
  };

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapNightTheme}
        initialRegion={{
          latitude: location?.coords.latitude
            ? location?.coords.latitude
            : 25.098960013248654,
          longitude: location?.coords.longitude
            ? location?.coords.longitude
            : 55.17555855061869,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation
        // showsMyLocationButton
        style={{ flex: 1 }}
      >
        {scrapbook?.map((_: any, index: any) => {
          return (
            <Marker
              key={index}
              coordinate={coordinates![index]}
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
      <MapCard
        user={user}
        scrapbooks={scrapbook}
        scrollX={scrollX}
        scrollViewRef={scrollViewRef}
      />
    </View>
  );
}
