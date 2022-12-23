import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { horizontalScale, verticalScale } from '../../utils/scale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface AddProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'Camera',
    'PhoneLibrary'
  >;
}

export default function AddScrapbook({ navigation }: AddProps) {
  return (
    <Wrapper>
      <Header>Start a Scrapbook</Header>
      <HeaderTwo>
        Add content to your scrapbook using the tools below.
      </HeaderTwo>
      <CameraBtn
        onPress={() => navigation.navigate('Camera')}
        activeOpacity={0.8}
      >
        <Ionicons name="ios-camera" size={40} color="white" />
      </CameraBtn>
      <ImageBtn
        onPress={() => navigation.navigate('PhoneLibrary')}
        activeOpacity={0.8}
      >
        <Ionicons name="image-outline" size={38} color="white" />
      </ImageBtn>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(View)`
  position: absolute;
  width: ${horizontalScale(229)}px;
  left: ${horizontalScale(34)}px;
  top: ${verticalScale(230)}px;
`;

const Header = styled(Text)`
  position: absolute;
  /* font-family: 'Poppins'; */
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 30px;
  color: ${(p) => p.theme.colors.primary};
`;

const HeaderTwo = styled(Text)`
  position: absolute;
  width: ${horizontalScale(204)}px;
  top: ${verticalScale(60)}px;
  /* font-family: 'Poppins'; */
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.primary};
`;

const CameraBtn = styled(TouchableOpacity)`
  /* position: absolute; */
  width: 40px;
  height: 40px;
  left: 70px;
  top: 300px;
`;

const ImageBtn = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  left: 200px;
  top: 260px;
`;
