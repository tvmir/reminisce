import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Alert,
  Linking,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RootStackParamList } from '../../utils/types';
import DraggableFlatList from 'react-native-draggable-flatlist';
import FitImage from 'react-native-fit-image';
import Header from '../../ui/components/Extra/Header';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface ImagesProps {
  navigation: StackNavigationProp<RootStackParamList, 'Images'>;
  route: RouteProp<{ params: { image: string } }, 'params'>;
}

export default function Images({ navigation, route }: ImagesProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { image } = route.params || {};

  // Selecting images from the system library
  const useLibrary = async (): Promise<void> => {
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

    // Launching the system library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [1, 1],
      quality: 0,
    });
    setIsLoading(false);

    // Get the selected images and add them to the state
    let results: string[] = [];
    result.assets?.forEach((asset) => results.push(asset.uri));

    Promise.all(results)
      .then(() => {
        if (image === undefined && result.assets!.length > 1) {
          setImages([...results, ...images]);
        } else if (image !== undefined && result.assets!.length > 0) {
          setImages([image, ...results, ...images]);
        } else {
          setImages(results);
        }
      })
      .catch((err) =>
        // console.log('No image has been selected from the library')
        console.log('\n')
      );

    console.log('IMAGES', images);
  };

  useEffect(() => {
    useLibrary();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="New Scrapbook"
        navigation={navigation}
        close={false}
        onSave={() => navigation.navigate('Post', { images })}
        text="Next"
      />
      <DraggableFlatList
        showsVerticalScrollIndicator={false}
        data={images}
        renderItem={({ item, drag, isActive }) => (
          <>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onLongPress={drag}
                disabled={isActive}
              >
                <FitImage source={{ uri: item }} key={item} />
              </TouchableOpacity>
            </View>
          </>
        )}
        keyExtractor={(item) => item}
        onDragEnd={({ data }) => setImages(data)}
        ListHeaderComponent={
          isLoading ? (
            <View>
              <ActivityIndicator style={{ paddingTop: 20 }} />
            </View>
          ) : (
            <></>
          )
        }
      />
    </View>
  );
}
