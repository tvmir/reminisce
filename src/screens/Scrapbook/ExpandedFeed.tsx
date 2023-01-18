import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScrapbookImageList from '../../ui/components/Scrapbook/ScrapbookImageList';

export default function ExpandedFeed({ route, navigation }: any) {
  const { item } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <ScrapbookImageList images={[...item.images]} id={item.id} item={item} />
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
