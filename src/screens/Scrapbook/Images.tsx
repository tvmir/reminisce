import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  useWindowDimensions,
  ActivityIndicator,
  Alert,
  Linking,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import DraggableFlatList from 'react-native-draggable-flatlist';
import FitImage from 'react-native-fit-image';
import Header from '../../ui/components/Extra/Header';

interface LoadProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Images'>;
  route: any;
}

export default function Images({ navigation, route }: LoadProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { height } = useWindowDimensions();
  const { image } = route.params || {};

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

    console.log('IMG', image);

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

    console.log('RESULTS', results);
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
        onSave={() => navigation.navigate('Post', { images } as any)}
        text="Next"
      />
      <DraggableFlatList
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ height: height + 100 }}
        data={images}
        renderItem={({ item, drag, isActive }) => (
          <>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                // style={{ paddingTop: 20 }}
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
