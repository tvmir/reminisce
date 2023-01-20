import React, { useRef } from 'react';
import {
  View,
  Animated,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import ScrapbookDetails from './ScrapbookDetails';
import MasonryList from '@react-native-seoul/masonry-list';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScrapbookImageList({
  images,
  id,
  item,
  navigation,
}: any) {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: 14,
            paddingBottom: 8,
            paddingTop: 18,
          }}
        >
          <Text style={[{ fontSize: 32, fontWeight: 'bold', color: '#fff' }]}>
            {item.name}
          </Text>

          <Text style={[{ fontSize: 10, color: '#cdcdcd' }]}>
            {item.location.name || ''}
          </Text>
          <Text style={[{ fontSize: 14, color: '#ffffff', paddingTop: 10 }]}>
            {item.description}
          </Text>
          <Text style={[{ fontSize: 12, color: '#949494', paddingTop: 10 }]}>
            {item.tags
              .map((tag: string) => `#${tag}`)
              .join(' ')
              .replace(/# /g, '#') || ''}
          </Text>
        </View>
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
                        // @ts-ignore
                        source={{ uri: item }}
                      />
                    </SharedElement>
                  </TouchableWithoutFeedback>
                </View>
              ) : (
                <View style={{ padding: 6 }}>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('FullView', { item })}
                  >
                    <SharedElement id={`${id}.imagesV`}>
                      <Image
                        borderRadius={16}
                        style={{
                          height: i % 3 === 0 ? 160 : 230,
                          borderRadius: 16,
                        }}
                        // @ts-ignore
                        source={{ uri: item }}
                      />
                    </SharedElement>
                  </TouchableWithoutFeedback>
                </View>
              )}
            </>
          )}
        />
      </ScrollView>
      {<ScrapbookDetails item={item} scrollY={scrollY} />}
    </SafeAreaView>
  );
}
