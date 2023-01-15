import React from 'react';
import { View, Text } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import ScrapbookCardMasonry from './ScrapbookCardMasonry';

export default function ScrapbookMasonry({ scrapbooks, navigation }: any) {
  return (
    <MasonryList
      // @ts-ignore
      data={scrapbooks}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={{ paddingHorizontal: 14 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <ScrapbookCardMasonry item={item} index={i} navigation={navigation} />
      )}
      refreshing={false}
    />
  );
}
