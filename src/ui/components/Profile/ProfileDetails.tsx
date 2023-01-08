import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { verticalScale } from '../../../utils/scale';
import { SharedElement } from 'react-navigation-shared-element';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

// constants
const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - (24 + 18 / 2);
const CARD_HEIGHT = 200;

export default function ProfileDetails({ item, navigation }: any) {
  return (
    <TouchableWithoutFeedback
      style={{}}
      onPress={() => navigation.navigate('Expanded', { item })}
    >
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <ImgWrapper
          style={{
            marginLeft: 12,
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
            <SharedElement
              id={`${item.id}.images`}
              // id={`${item.id}`}
            >
              <View
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT - 60,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <ImageStyle
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
                marginTop: 4,
                marginLeft: 10,
                marginRight: 6,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    marginVertical: 4,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#d3d6d9',
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ fontSize: 12, color: '#8e8e8e' }}>
                  {item.location}
                </Text>
              </View>
              <Entypo name="dots-three-horizontal" size={12} color="#d3d6d9" />
            </View>
          </ImageWrapper>
        </ImgWrapper>
      </View>
    </TouchableWithoutFeedback>
  );
}

const ImgWrapper = styled(View)``;
const ImageWrapper = styled(View)`
  border-radius: 16px;
  border: 0.5px solid #121212;
`;

const ImageStyle = styled(Image)``;
