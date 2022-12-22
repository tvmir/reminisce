import React, { useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';

export default function PhoneLibrary() {
  const [images, setImages] = useState<string[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [libraryPermission, requestLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const { width } = useWindowDimensions();

  // Picking image(s) from the library
  const pickImages = async () => {
    setIsLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      // Focus on handling images for now
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [1, 1],
      quality: 1,
    });
    setIsLoading(false);
    console.log(result.assets?.map((asset) => asset.uri));
    if (!result.canceled) {
      setImages(result.assets?.map((asset) => asset.uri));
    }
  };

  return (
    <>
      {!libraryPermission ? (
        <View />
      ) : !libraryPermission.granted ? (
        <Wrapper>
          <Text style={{ justifyContent: 'center', textAlign: 'center' }}>
            We need your permission to show the phone library
          </Text>
          <Button
            onPress={requestLibraryPermission}
            title="grant lib permission"
          />
        </Wrapper>
      ) : (
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
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Loading...
                </Text>
                <ActivityIndicator size={'large'} />
              </View>
            ) : (
              <Button title="Pick images" onPress={pickImages} />
            )
          }
        />
      )}
    </>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  justify-content: 'center';
`;
