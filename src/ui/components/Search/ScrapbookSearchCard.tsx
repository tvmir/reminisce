import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';

// constants
const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - (24 + 18 / 2);
const CARD_HEIGHT = 200;

export default function ScrapbookSearchCard({ item, navigation }: any) {
  return (
    <TouchableWithoutFeedback
      style={{}}
      onPress={() => navigation.navigate('ExpandedFeed', { item })}
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
          <ImageWrapper
            style={{
              width: CARD_WIDTH + 1,
              height: CARD_HEIGHT,
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
                  {item.location}
                </Text>
              </View>
            </View>
          </ImageWrapper>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const ImageWrapper = styled(View)`
  border-radius: 16px;
  border: 0.5px solid #121212;
`;
