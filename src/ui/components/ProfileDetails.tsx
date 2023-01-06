import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import styled from 'styled-components/native';
import { verticalScale } from '../../utils/scale';
import { SharedElement } from 'react-navigation-shared-element';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileDetails({ item, navigation }: any) {
  return (
    <ImgWrapper style={{ flex: 1 / 2, paddingHorizontal: 5 }}>
      <ImageWrapper>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Expanded', { item })}
        >
          <SharedElement id={item.id}>
            <ImageStyle source={{ uri: item.images[0] }} />
          </SharedElement>
        </TouchableWithoutFeedback>
        <View style={{ padding: 5 }}>
          <Text style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingRight: 10,
              paddingVertical: 2,
            }}
          >
            <Ionicons name="location-sharp" size={10} color="#10F0FE" />
            <Text
              style={{
                color: 'white',
                fontSize: 9,
                fontWeight: '400',
                paddingHorizontal: 2,
              }}
            >
              {item.location}
            </Text>
          </View>
        </View>
      </ImageWrapper>
    </ImgWrapper>
  );
}

const ImgWrapper = styled(View)`
  height: ${verticalScale(150)}px;
`;
const ImageWrapper = styled(View)`
  height: 140px;
  border-radius: 6px;
  border: 0.5px solid #1f1e1e;
  padding-bottom: 25px;
`;

const ImageStyle = styled(Image)`
  height: 90%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: #727477;
`;
