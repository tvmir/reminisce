import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import ScrapbookInteractionsBar from './ScrapbookInteractionsBar';
import MasonryList from '@react-native-seoul/masonry-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DocumentData } from 'firebase/firestore';
import { RootStackParamList } from '../../../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';
import ScrapbookDetails from './ScrapbookDetails';

interface ScrapbookImagesProps {
  images: string[];
  id: string;
  item: DocumentData | undefined;
  navigation: StackNavigationProp<RootStackParamList, 'Scrapbook'>;
}

export default function ScrapbookImages({
  images,
  id,
  item,
  navigation,
}: ScrapbookImagesProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrapbookDetails item={item} />
        <MasonryList
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          data={images}
          renderItem={({ item, i }) => (
            <>
              {!i ? (
                <View style={{ padding: 6 }}>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('FullView', { item })}
                  >
                    <SharedElement id={`${id}.images`}>
                      <Image
                        style={{ height: 260, borderRadius: 16 }}
                        source={{ uri: item } as any}
                      />
                    </SharedElement>
                  </TouchableWithoutFeedback>
                </View>
              ) : (
                <View style={{ padding: 6 }}>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('FullView', { item })}
                  >
                    <SharedElement id={`${id}.imagesView`}>
                      <Image
                        borderRadius={16}
                        style={{
                          height: i % 3 === 0 ? 160 : 230,
                          borderRadius: 16,
                        }}
                        source={{ uri: item } as any}
                      />
                    </SharedElement>
                  </TouchableWithoutFeedback>
                </View>
              )}
            </>
          )}
        />
      </ScrollView>
      {<ScrapbookInteractionsBar item={item} />}
    </SafeAreaView>
  );
}
