import React from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import ScrapbookCardMasonry from './ScrapbookCardMasonry';
import { DocumentData } from 'firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../utils/types';

interface ScrapbookMasonryProps {
  scrapbooks: DocumentData[] | undefined;
  navigation: NativeStackScreenProps<RootStackParamList>;
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
