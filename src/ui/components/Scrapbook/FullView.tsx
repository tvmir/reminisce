import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FitImage from 'react-native-fit-image';
import { SharedElement } from 'react-navigation-shared-element';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RouteProp } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../utils/types';

interface FullViewProps {
  route: RouteProp<{ params: { item: DocumentData } }, 'params'>;
  navigation: StackNavigationProp<RootStackParamList, 'FullView'>;
}

export default function FullView({ route, navigation }: FullViewProps) {
  const { item } = route.params;

  return (
    <View
      style={{
        justifyContent: 'center',
        paddingTop: 100,
      }}
    >
      <SharedElement id={`${item.id}.imagesView`}>
        {/* @ts-ignore */}
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
