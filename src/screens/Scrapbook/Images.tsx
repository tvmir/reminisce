import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Button,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

interface LoadProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Images'>;
}

export default function Images({ navigation }: LoadProps) {
  const [images, setImages] = useState<string[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  // Selecting images from the system library
  const useLibrary = async () => {
    setIsLoading(true);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      Alert.alert(
        'Share on Reminisce',
        'Allow access to your Photos so you can start your sharing memories.',
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

    let result = await ImagePicker.launchImageLibraryAsync({
      // Focus on handling images for now
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [1, 1],
      quality: 0.2,
    });
    setIsLoading(false);

    let results: string[] = [];
    result.assets?.forEach((asset) => results.push(asset.uri));
    if (result.assets!.length > 1) {
      setImages([...results, ...(images as string[])]);
    } else {
      setImages(results);
    }
  };

  // Accessing the system camera
  const useCamera = async () => {
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

    let result = await ImagePicker.launchCameraAsync({
      quality: 0.2,
    });
    setIsLoading(false);
    // console.log(result.assets?.map((asset) => asset.uri));
    if (!result.canceled) {
      setImages(result.assets?.map((asset) => asset.uri));
    }
  };

  // TODO: play around with the mount
  useEffect(() => {
    useLibrary();
  }, []);

  return (
    <>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: width, height: 250 }}
            key={item}
          />
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={{ marginVertical: 40, paddingBottom: 100 }}
        ListHeaderComponent={
          isLoading ? (
            <View>
              <ActivityIndicator style={{ paddingTop: 20 }} />
            </View>
          ) : (
            <>
              {/* <View>{navigation.pop()}</View> */}
              <Button onPress={useCamera} title="Open Camera" />
              <Button
                onPress={() => navigation.navigate('Post', { images } as any)}
                title="Test"
              />
            </>
          )
        }
      />
    </>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  justify-content: 'center';
`;
