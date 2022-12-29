import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
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
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  console.log(images);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper>
        {images.map((image, i) => (
          <Image key={i} source={{ uri: image }} />
        ))}
        <Input
          placeholder="Write a description..."
          placeholderTextColor="#ffffff"
          onChangeText={(desc) => setDescription(desc)}
          keyboardAppearance="dark"
        />

        <Button
          title="Post"
          onPress={() =>
            uploadScrapbook(images, description, location, navigation)
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
  color: ${(p) => p.theme.colors.primary};
`;
