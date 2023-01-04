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
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import DraggableFlatList from 'react-native-draggable-flatlist';

interface LoadProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Images'>;
}

export default function Images({ navigation }: LoadProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  // Selecting images from the system library
  const useLibrary = async () => {
    setIsLoading(true);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      Alert.alert(
        'Share on Reminisce',
        'Allow access to your Photos so you can start sharing your memories.',
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
      quality: 0,
    });
    setIsLoading(false);
    let results: string[] = [];
    result.assets?.forEach((asset) => results.push(asset.uri));

    Promise.all(results)
      .then(() => {
        if (result.assets!.length > 1) {
          setImages([...results, ...images]);
        } else {
          setImages(results);
        }
      })
      .catch((err) => console.log('No image has been selected.', err));
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
    if (!result.canceled) {
      setImages(result.assets?.map((asset) => asset.uri));
    }
  };

  useEffect(() => {
    useLibrary();
  }, []);

  return (
    <>
      <DraggableFlatList
        data={images}
        renderItem={({ item, drag, isActive }) => (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              onLongPress={drag}
              disabled={isActive}
            >
              <Image
                source={{ uri: item }}
                style={{ width: width, height: 250 }}
                key={item}
              />
            </TouchableOpacity>
          </>
        )}
        keyExtractor={(item) => item}
        onDragEnd={({ data }) => setImages(data)}
        contentContainerStyle={{ marginVertical: 40, paddingBottom: 100 }}
        ListHeaderComponent={
          isLoading ? (
            <View>
              <ActivityIndicator style={{ paddingTop: 20 }} />
            </View>
          ) : (
            <>
              {/* <Button onPress={useCamera} title="Open Camera" /> */}
              <Button
                onPress={() => navigation.navigate('Post', { images } as any)}
                title="Post"
              />
            </>
          )
        }
      />
    </>
  );
}

// Styles
const Wrapper = styled(View)`
  flex: 1;
  justify-content: 'center';
`;
