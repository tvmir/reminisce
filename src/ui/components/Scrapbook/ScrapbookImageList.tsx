import React, { useRef } from 'react';
import {
  View,
  Animated,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import ScrapbookDetails from './ScrapbookDetails';
import MasonryList from '@react-native-seoul/masonry-list';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScrapbookImageList({ images, id, item }: any) {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: 14,
            paddingBottom: 16,
            paddingTop: 18,
          }}
        >
          <Text style={[{ fontSize: 32, fontWeight: 'bold', color: '#fff' }]}>
            {item.name}
          </Text>

          <Animated.Text style={[{ fontSize: 11, color: '#cdcdcd' }]}>
            {item.location.name || ''}
          </Animated.Text>
        </View>
        <MasonryList
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          data={images}
          renderItem={({ item, i }) => (
            <>
              {!i ? (
                <View style={{ padding: 6 }}>
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
                  <View style={{ padding: 6 }}>
                    <Image
                      borderRadius={16}
                      style={{
                        height: i % 3 === 0 ? 160 : 230,
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
      </ScrollView>
      {<ScrapbookDetails item={item} scrollY={scrollY} />}
    </SafeAreaView>
  );
}
