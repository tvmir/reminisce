import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  updateUserDetails,
  uploadProfilePicture,
} from '../../contexts/services/user';
import { useAppSelector } from '../../utils/hooks';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scale';

export default function Edit({ route, navigation }: any) {
  const { field, value } = route.params;
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  const editProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    if (!result.canceled) {
      // @ts-ignore
      uploadProfilePicture(result.assets[0]?.map((asset) => asset.uri));
    }
  };

  const [inputBio, setInputBio] = useState<string>(value.bio);
  const [inputName, setInputName] = useState<string>(value.name);

  const editDetails = () => {
    if (field.name)
      updateUserDetails(field.name, inputName).then(() => {
        navigation.goBack;
      });

    if (field.bio)
      updateUserDetails(field.bio, inputBio).then(() => {
        navigation.goBack();
      });
  };

  return (
    <Wrapper>
      <SubWrapper>
        <ProfilePictureButton onPress={editProfilePicture}>
          <ProfilePicture source={{ uri: currentUser?.photoURL }} />
          <View style={{ backgroundColor: 'rgba(0,0,0, 0.5)' }} />
          <Feather name="camera" size={28} color="white" />
        </ProfilePictureButton>
        <View style={{ padding: 10, width: '90%' }}>
          <Text style={{ color: 'white' }}>Name</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: '#edededb2',
              marginTop: 10,
              marginBottom: 10,
              color: 'white',
            }}
            placeholder={inputName}
            placeholderTextColor="#edededb2"
            keyboardType="default"
            autoCapitalize="none"
            value={inputName}
            keyboardAppearance="dark"
            onChangeText={setInputName}
          />
          <Text style={{ color: 'white', paddingTop: 30 }}>Bio</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: '#edededb2',
              marginTop: 10,
              marginBottom: 10,
              color: 'white',
            }}
            placeholder={inputBio}
            placeholderTextColor="#edededb2"
            keyboardType="default"
            autoCapitalize="none"
            value={inputBio}
            keyboardAppearance="dark"
            onChangeText={setInputBio}
          />
        </View>
        <Button title="Save" onPress={() => editDetails()} />
      </SubWrapper>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(SafeAreaView)`
  flex: 1;
`;

const SubWrapper = styled(View)`
  align-items: center;
`;

const ProfilePictureButton = styled(TouchableOpacity)`
  background-color: #656565;
  height: ${verticalScale(120)}px;
  width: ${horizontalScale(120)}px;
  border-radius: ${moderateScale(60)}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const ProfilePicture = styled(Image)`
  height: ${verticalScale(120)}px;
  width: ${horizontalScale(120)}px;
  position: absolute;
`;

const InputBorder = styled(View)`
  width: 100%;
  border-bottom-color: #232222;
  border-bottom-width: 1px;
`;

// const Input = styled(TextInput)`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   padding: 15px 15px;
//   margin-top: ${verticalScale(20)}px;
//   width: 100%;
//   color: white;
// `;

const Input = styled(TextInput)`
  align-items: center;
  padding: 6px 12px;
  margin-top: ${verticalScale(30)}px;
  width: 80%;
  height: ${verticalScale(40)}px;
  background: #050505;
  border: 1px solid #1d1d1d;
  border-radius: ${moderateScale(4)}px;
  color: white;
`;
