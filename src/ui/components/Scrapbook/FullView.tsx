import React from 'react';
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import FitImage from 'react-native-fit-image';
import { SharedElement } from 'react-navigation-shared-element';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FullView({ route, navigation }: any) {
  const { item } = route.params;
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        justifyContent: 'center',
        paddingTop: 100,
      }}
    >
      <SharedElement id={`${item.id}.imagesView`}>
        <FitImage source={{ uri: item }} />
      </SharedElement>
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
  );
}
