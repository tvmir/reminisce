import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { SharedElement } from 'react-navigation-shared-element';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import { DocumentData } from 'firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../utils/types';

// constants
const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2.25;
const CARD_HEIGHT = 170;

interface ProfileCardDetailsProps {
  item: DocumentData | undefined;
  navigation: NativeStackScreenProps<RootStackParamList>;
}

export default function ProfileCardDetails({
  item,
  navigation,
}: ProfileCardDetailsProps) {
  return (
    <TouchableWithoutFeedback
      style={{
        flex: 1,
        flexDirection: 'row',
      }}
      // @ts-ignore
      onPress={() => navigation.navigate('Scrapbook', { item })}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            left: 7,
            paddingRight: 14,
          }}
        >
          <ImageWrapper
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
          >
            <SharedElement id={`${item?.id}.images`}>
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
                  source={{ uri: item?.images[0] }}
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
                    marginVertical: 4,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#d3d6d9',
                  }}
                >
                  {item?.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 12, color: '#8e8e8e' }}
                >
                  {item?.location.name}
                </Text>
              </View>
              <Entypo name="dots-three-horizontal" size={12} color="#d3d6d9" />
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
