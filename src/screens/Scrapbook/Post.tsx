import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { uploadScrapbook } from '../../contexts/services/scrapbook';

interface PostProps {
  route: RouteProp<{ params: { images: string[] } }, 'params'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Post'>;
}

export default function Post({ route, navigation }: PostProps) {
  const { images } = route.params;
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const { width } = useWindowDimensions();
  console.log(images);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper>
        {images.map((image, i) => (
          <Image
            style={{ width: width, height: 200, paddingVertical: 5 }}
            key={i}
            source={{ uri: image }}
          />
        ))}
        <Input
          placeholder="Name your scrapbook..."
          placeholderTextColor="#959595"
          onChangeText={(text) => setName(text)}
          keyboardAppearance="dark"
        />

        <Input
          placeholder="Write a description..."
          placeholderTextColor="#959595"
          onChangeText={(text) => setDescription(text)}
          keyboardAppearance="dark"
        />

        {/* TODO: Replace this with Google Places API (Autocomplete) */}
        <Input
          placeholder="Where was this taken?"
          placeholderTextColor="#959595"
          onChangeText={(text) => setLocation(text)}
          keyboardAppearance="dark"
        />

        <Button
          title="Post"
          onPress={() =>
            uploadScrapbook(name, images, description, location, navigation)
          }
        />
      </Wrapper>
    </TouchableWithoutFeedback>
  );
}

// Styles
const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.colors.background};
`;

const Input = styled(TextInput)`
  padding-top: 20px;
  color: ${(p) => p.theme.colors.primary};
`;
