import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  mapNightTheme,
  mapDarkTheme,
  customMapTheme,
} from '../../ui/shared/mapTheme';
import * as Locaiton from 'expo-location';
import Animated, { call, useCode } from 'react-native-reanimated';
// @ts-ignore
import nearBy from '../../../assets/gray_i.png';
// @ts-ignore
import current from '../../../assets/curr_i.png';
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
  useUserQuery,
} from '../../utils/hooks';
import MapCard from '../../ui/components/Map/MapCard';
import { fetchScrapbooks } from '../../contexts/slices/scrapbooks/scrapbooksSlice';
import { LocationObject } from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';

// constants
const nearByIndicator = Image.resolveAssetSource(nearBy).uri;
const currentIndicator = Image.resolveAssetSource(current).uri;
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.65;
const SPACING = width * 0.15;

interface MapProps {
  navigation: StackNavigationProp<RootStackParamList, 'CameraView'>;
}

export default function Map({ navigation }: MapProps) {
  const [location, setLocation] = useState<LocationObject>();
  const mapRef = useRef<MapView>(null);
  const scrollRef = useRef<Animated.ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrapbook = useAppSelector((state) => state.scrapbooks.scrapbooks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchScrapbooks());
  }, []);

  const user = scrapbook?.map((_, index: number) => {
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
  let scrollIndex = 0;
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

  // Setting the scroll view to the marker that is pressed
  const onMarkerPress = (mapEventData: any): void => {
    const id = mapEventData._targetInst.return.key;
    let x = id * CARD_WIDTH + id * 20;

    if (Platform.OS === 'ios') x = x - SPACING;
    scrollRef?.current?.scrollTo({ x: x, y: 0, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapNightTheme}
        initialRegion={{
          latitude: location?.coords.latitude as number,
          longitude: location?.coords.longitude as number,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation
        // showsMyLocationButton
        style={{ flex: 1 }}
      >
        {scrapbook?.map((_, index: number) => {
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
      <TouchableOpacity
        onPress={() => navigation.navigate('CameraView')}
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          bottom: 160,
          right: 20,
          borderWidth: 1,
          borderColor: '#1F1E1E',
          borderRadius: 48,
          height: 60,
          width: 60,
          backgroundColor: '#1F1E1E',
        }}
      >
        <MaterialCommunityIcons
          name="rotate-360"
          size={36}
          color="white"
          style={{ position: 'absolute', top: 10, left: 10 }}
        />
      </TouchableOpacity>
      <MapCard
        user={user}
        scrapbooks={scrapbook}
        scrollX={scrollX}
        scrollRef={scrollRef}
      />
    </View>
  );
}
