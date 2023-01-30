import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DocumentData } from 'firebase/firestore';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScrapbookImages from '../../ui/components/Scrapbook/ScrapbookImages';
import { RootStackParamList } from '../../utils/types';

interface ScrapbookProps {
  route: RouteProp<{ params: { item: DocumentData } }, 'params'>;
  navigation: StackNavigationProp<RootStackParamList, 'Scrapbook'>;
}

export default function Scrapbook({ route, navigation }: ScrapbookProps) {
  const { item } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <ScrapbookImages
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
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close-circle" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}
