import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { uploadProfilePicture } from '../../contexts/services/user';
import { useAppSelector } from '../../utils/hooks';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scale';

export default function Edit() {
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const editProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    // console.log('EDIT PROFILE:', result);
    if (!result.canceled) {
      // @ts-ignore
      uploadProfilePicture(result.assets?.map((asset) => asset.uri));
    }
  };

  return (
    <Wrapper>
      <SubWrapper>
        <ProfilePictureButton onPress={editProfilePicture}>
          <ProfilePicture source={{ uri: currentUser?.photoURL }} />
          <View style={{ backgroundColor: 'rgba(0,0,0, 0.5)' }} />
          <Feather name="camera" size={28} color="white" />
        </ProfilePictureButton>
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
