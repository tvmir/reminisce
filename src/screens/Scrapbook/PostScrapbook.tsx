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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { auth } from '../../api/firebase';
import { writeNewUserScrapbook } from '../../api/queries';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

interface PostProps {
  route: RouteProp<{ params: { image: string } }, 'params'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export default function PostScrapbook({ route, navigation }: PostProps) {
  const { image } = route.params;
  console.log(image);
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const upload = async () => {
    const storage = getStorage();
    const response = await fetch(image);
    const path = `scrapbooks/${auth.currentUser?.uid}/${Math.random().toString(
      36
    )}`;
    console.log('Storage PATH:', path);
    const metadata = { contentType: 'image/jpeg' };
    const storageRef = ref(storage, path);
    const blob = await response.blob();

    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Uploading... ' + Math.floor(progress) + '%');
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          writeNewUserScrapbook(description, location, navigation, downloadURL);
          console.log('File available at', downloadURL);
        });
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper>
        <Image source={{ uri: image }} />
        <Input
          placeholder="Write a description..."
          placeholderTextColor="#ffffff"
          onChangeText={(desc) => setDescription(desc)}
          keyboardAppearance="dark"
        />

        <Button title="Post" onPress={upload} />
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
