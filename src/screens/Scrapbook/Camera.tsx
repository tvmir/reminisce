import React from 'react';
import styled from 'styled-components/native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

interface SaveImgProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PostScrapbook'>;
}

export default function CameraScrapbook({ navigation }: SaveImgProps) {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [image, setImage] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // Toggling the front and back camera
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  // Taking a picture
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      // console.log(photo.uri);
      setImage(photo.uri);
    } else {
      console.log('No camera has been found');
    }
  };

  return (
    <>
      {!permission ? (
        <View />
      ) : !permission.granted ? (
        <Wrapper>
          <Text style={{ justifyContent: 'center', textAlign: 'center' }}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="grant permission" />
        </Wrapper>
      ) : (
        <Wrapper>
          <CameraContainer ref={cameraRef} type={type} ratio={'1:1'}>
            <ButtonContainer>
              <Btn onPress={toggleCameraType}>
                <BtnText>Flip</BtnText>
              </Btn>
              <Btn2 onPress={takePicture}>
                <BtnText>Pic</BtnText>
              </Btn2>
              <Btn3
                onPress={() =>
                  navigation.navigate('PostScrapbook', { image } as any)
                }
              >
                <BtnText>Save</BtnText>
              </Btn3>
            </ButtonContainer>
          </CameraContainer>
          {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
        </Wrapper>
      )}
    </>
  );
}

// Styles
const Wrapper = styled(View)`
  flex: 1;
  justify-content: 'center';
`;

const CameraContainer = styled(Camera)`
  padding-top: 250px;
`;

const ButtonContainer = styled(View)`
  flex-direction: row;
  background-color: 'transparent';
  margin: 84px;
`;

const Btn = styled(TouchableOpacity)`
  align-self: flex-end;
  align-items: center;
`;

const Btn2 = styled(TouchableOpacity)`
  padding-left: 80px;
  align-self: flex-end;
  align-items: center;
`;

const Btn3 = styled(TouchableOpacity)`
  padding-left: 90px;
  align-self: flex-end;
  align-items: center;
`;

const BtnText = styled(Text)`
  font-size: 14px;
  color: white;
  font-weight: bold;
`;
