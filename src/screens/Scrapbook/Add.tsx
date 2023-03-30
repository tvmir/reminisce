import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  Alert,
  Linking,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../utils/types';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Header from '../../ui/components/Extra/Header';
import { StackNavigationProp } from '@react-navigation/stack';

interface AddProps {
  navigation: StackNavigationProp<RootStackParamList, 'Add'>;
}

export default function Add({ navigation }: AddProps) {
  const [image, setImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();

  // Saving image to camera roll
  const saveToCameraRoll = async (image: string): Promise<void> => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        MediaLibrary.createAlbumAsync('Images', asset, false)
          .then(() => {
            console.log('Image has been saved successfully');
          })
          .catch(() => {
            console.log('Image has not been saved');
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Need Storage permission to save image');
    }
  };

  // Accessing the system camera
  const useCamera = async (): Promise<void> => {
    setIsLoading(true);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted === false) {
      Alert.alert(
        'Share on Reminisce',
        'Allow access to your Camera so you can start capturing memories the moment they happen.',
        [
          {
            text: 'Settings',
            onPress: () => Linking.openURL('app-settings:'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
      setIsLoading(false);
      return;
    }

    // Launching the camera and tweaking its quality
    let result = await ImagePicker.launchCameraAsync({
      quality: 0.2,
      allowsMultipleSelection: true,
      aspect: [1, 1],
    });
    setIsLoading(false);
    if (!result.canceled) {
      setImage(result.assets[0]?.uri);
    }
  };

  useEffect(() => {
    if (image) {
      // saveToCameraRoll(image);
      navigation.push('Images', { image });
    }
  }, [image]);

  return (
    <>
      <Header title="New Scrapbook" navigation={navigation} close />
      {isLoading && !image ? (
        <View>
          <ActivityIndicator style={{ paddingTop: 20 }} />
        </View>
      ) : image ? (
        <>
          <Image
            source={{ uri: image }}
            style={{ width: width, height: undefined, aspectRatio: 3 / 2 }}
          />
          <View
            style={{
              width: width,
              top: height / 6,
            }}
          >
            <View
              style={{
                height: height,
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}
            >
              <Ionicons
                name="image-outline"
                onPress={() => navigation.push('Images')}
                color="white"
                size={38}
                testID="open-library"
              />
              <Ionicons
                name="camera-outline"
                onPress={useCamera}
                color="white"
                size={38}
                testID="open-camera"
              />
              <Button
                title="Next"
                onPress={() => {
                  navigation.push('Images', { image });
                }}
              />
            </View>
          </View>
        </>
      ) : (
        <View>
          <View
            style={{ position: 'absolute', width: 229, left: 34, top: 150 }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 32,
                fontWeight: '700',
                lineHeight: 30,
              }}
            >
              Start a Scrapbook
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 13,
                fontWeight: '500',
                lineHeight: 16,
              }}
            >
              Add content to your scrapbook using the tools below.
            </Text>
          </View>
          <View
            style={{
              width: width,
              top: height / 2,
            }}
          >
            <View
              style={{
                height: height,
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}
            >
              <Ionicons
                name="image-outline"
                onPress={() => navigation.push('Images')}
                color="white"
                size={38}
              />
              <Ionicons
                name="camera-outline"
                onPress={useCamera}
                color="white"
                size={38}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
}
