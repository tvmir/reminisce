import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';
import { useAppSelector, useUserQuery } from '../../utils/hooks';
import { SharedElement } from 'react-navigation-shared-element';
import { getDistance } from '../../contexts/services/scrapbook';
import * as Locaiton from 'expo-location';
import { LocationObject } from 'expo-location';

interface CameraViewProps {
  navigation: StackNavigationProp<RootStackParamList, 'CameraView'>;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.65;

export default function CameraView({ navigation }: CameraViewProps) {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const cameraRef = useRef<Camera>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const scrapbook = useAppSelector((state) => state.scrapbooks.scrapbooks);
  const user = scrapbook?.map((_, index: number) => {
    return useUserQuery(scrapbook[index]?.uid).data;
  });

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
  const coordinates = scrapbook?.map((marker) => {
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
    <>
      {!permission ? (
        <View />
      ) : !permission.granted ? (
        <View style={{ flex: 1 }}>
          <Text style={{ justifyContent: 'center', textAlign: 'center' }}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <Camera
              style={{ flex: 5, borderRadius: 20 }}
              type={type}
              ref={cameraRef}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 30,
                }}
              ></View>
            </Camera>

            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                position: 'absolute',
                top: 50,
                right: 10,
                opacity: 0.9,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close-circle" size={40} color="white" />
            </TouchableOpacity>

            {scrapbook?.slice(1, 2).map((item, index: number) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Scrapbook', { item })}
                key={index}
                style={{
                  backgroundColor: '#000000',
                  opacity: 0.9,
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                  marginHorizontal: 170,
                  height: 88,
                  width: CARD_WIDTH - 50,
                  overflow: 'hidden',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 600,
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
                      flex: 3,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </SharedElement>
                <View
                  style={{
                    padding: 10,
                    flex: 1.5,
                  }}
                >
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
                    @{user![index]?.username}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 11,
                      color: '#8e8e8e',
                      paddingTop: 28,
                      paddingLeft: 10,
                    }}
                  >
                    {location !== undefined
                      ? (
                          getDistance(currCoordinates, coordinates![1]) *
                          1.609344
                        ).toFixed(2)
                      : 'Loading...'}{' '}
                    km
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {scrapbook?.slice(0, 1).map((item, index: number) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Scrapbook', { item })}
              key={index}
              style={{
                backgroundColor: '#000000',
                opacity: 0.9,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                marginHorizontal: 30,
                height: 90,
                width: CARD_WIDTH - 50,
                overflow: 'hidden',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                top: 120,
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
              <View style={{ padding: 10, flex: 1.5 }}>
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
                  @{user![index]?.username}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 11,
                    color: '#8e8e8e',
                    paddingTop: 30,
                    paddingLeft: 12,
                  }}
                >
                  {location !== undefined
                    ? (
                        getDistance(currCoordinates, coordinates![0]) * 1.609344
                      ).toFixed(2)
                    : 'Loading...'}{' '}
                  km
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
    </>
  );
}
