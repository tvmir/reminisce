import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import { DocumentData } from 'firebase/firestore';
import { RootStackParamList } from '../../../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';

// constants
const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - (24 + 18 / 2);
const CARD_HEIGHT = 200;

interface ScrapbookSearchCardProps {
  item: DocumentData;
  navigation: StackNavigationProp<RootStackParamList, 'Scrapbook'>;
}

export default function ScrapbookSearchCard({
  item,
  navigation,
}: ScrapbookSearchCardProps) {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Scrapbook', { item })}
    >
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <View
          style={{
            marginRight: 20,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              width: CARD_WIDTH + 1,
              height: CARD_HEIGHT,
              borderRadius: 16,
              borderWidth: 0.5,
              borderColor: '#121212',
            }}
          >
            <SharedElement id={`${item.id}.images`}>
              <View
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT - 60,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <Animatable.Image
                  animation={'fadeInUp'}
                  easing="ease-in-out"
                  delay={300}
                  duration={300}
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT - 60,
                    resizeMode: 'cover',
                  }}
                  source={{ uri: item.images[0] }}
                />
              </View>
            </SharedElement>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: 10,
                paddingVertical: 8,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#d3d6d9',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 12, color: '#8e8e8e' }}
                >
                  {item.location.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
