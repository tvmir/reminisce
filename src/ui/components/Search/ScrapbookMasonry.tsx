import React from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import ScrapbookCardMasonry from './ScrapbookCardMasonry';
import { DocumentData } from 'firebase/firestore';
import { RootStackParamList } from '../../../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';

interface ScrapbookMasonryProps {
  scrapbooks: DocumentData[] | undefined;
  navigation: StackNavigationProp<RootStackParamList, 'Scrapbook'>;
}

export default function ScrapbookMasonry({
  scrapbooks,
  navigation,
}: ScrapbookMasonryProps) {
  return (
    <MasonryList
      data={scrapbooks!}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={{ paddingHorizontal: 14 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <ScrapbookCardMasonry
          item={item as DocumentData}
          index={i}
          navigation={navigation}
        />
      )}
      refreshing={false}
    />
  );
}
