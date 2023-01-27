import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScrapbookImageList from '../../ui/components/Scrapbook/ScrapbookImageList';
import { RootStackParamList } from '../../utils/types';

interface ScrapbookProps {
  route: RouteProp<{ params: { item: DocumentData } }, 'params'>;
  navigation: NativeStackScreenProps<RootStackParamList>;
}

export default function Scrapbook({ route, navigation }: ScrapbookProps) {
  const { item } = route.params;
  const nav = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ScrapbookImageList
        images={[...item.images]}
        id={item.id}
        item={item}
        navigation={navigation}
      />
      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
          position: 'absolute',
          top: 50,
          right: 10,
          opacity: 0.9,
        }}
        onPress={() => nav.goBack()}
      >
        <Ionicons name="close-circle" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}
