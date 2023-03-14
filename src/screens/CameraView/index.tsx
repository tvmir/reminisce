import React, { useRef, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';

interface CameraViewProps {
  navigation: StackNavigationProp<RootStackParamList, 'CameraView'>;
}

export default function CameraView({ navigation }: CameraViewProps) {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const cameraRef = useRef<Camera>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  return (
    <>
      {!permission ? (
        <View />
      ) : !permission.granted ? (
        <View style={{ flex: 1 }}>
          <Text style={{ justifyContent: 'center', textAlign: 'center' }}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 5, borderRadius: 20 }}
            type={type}
            ref={cameraRef}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 30,
              }}
            ></View>
          </Camera>
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              position: 'absolute',
              top: 50,
              right: 10,
              opacity: 0.9,
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close-circle" size={40} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
