import React from 'react';
import {
  Dimensions,
  FlatList,
  View,
  Animated,
  Text,
  Image,
} from 'react-native';
import FitImage from 'react-native-fit-image';
// import Animated from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import ScrapbookDetails from '../Modal/Scrapbook/ScrapbookDetails';
import MasonryList from '@react-native-seoul/masonry-list';
import { SafeAreaView } from 'react-native-safe-area-context';

// constants
const { height } = Dimensions.get('window');
// const MAX_HEIGHT = height / 1.2;

export default function ScrapbookImageList({ images, id, item, index }: any) {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const even = index % 2 === 0;

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 25 }}>
      <MasonryList
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        data={images}
        renderItem={({ item, i }) => (
          <>
            {!i ? (
              <View style={{ width: '100%', padding: 8 }}>
                <SharedElement id={`${id}.images`}>
                  <Image
                    style={{ height: 260, borderRadius: 16 }}
                    // @ts-ignore
                    source={{ uri: item }}
                  />
                </SharedElement>
              </View>
            ) : (
              <>
                <View style={{ width: '100%', padding: 10 }}>
                  {/* <FitImage
                    borderRadius={16}
                    
                    // @ts-ignore
                    source={{ uri: item }}
                  /> */}
                  <Image
                    borderRadius={16}
                    style={{
                      width: '100%',
                      height: index % 3 === 0 ? 130 : 205,
                      borderRadius: 16,
                    }}
                    // @ts-ignore
                    source={{ uri: item }}
                  />
                </View>
              </>
            )}
          </>
        )}
      />
      {<ScrapbookDetails item={item} scrollY={scrollY} />}
    </SafeAreaView>
  );
}
