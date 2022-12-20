import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { horizontalScale, verticalScale } from '../../utils/scale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

interface FeedProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddScrapbook'>;
}

export default function Feed({ navigation }: FeedProps) {
  return (
    <Wrapper>
      <Header>
        <TextLogo>reminisce</TextLogo>
        <AddBtn onPress={() => navigation.push('AddScrapbook')}>
          <Octicons name="plus-circle" size={28} color="white" />
        </AddBtn>
        <MessageBtn>
          <Ionicons name="ios-chatbubble-outline" size={30} color="white" />
        </MessageBtn>
      </Header>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(SafeAreaView)`
  /* background-color: #000; */
`;
const Header = styled(SafeAreaView)`
  position: absolute;
`;

const TextLogo = styled(Text)`
  font-family: 'Montserrat';
  left: ${horizontalScale(22)}px;
  top: ${verticalScale(70)}px;
  /* font-weight: 700; */
  font-size: 32px;
  line-height: 33px;

  text-align: center;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

const AddBtn = styled(TouchableOpacity)`
  left: ${horizontalScale(275)}px;
  top: ${verticalScale(39)}px;
`;

const MessageBtn = styled(TouchableOpacity)`
  position: absolute;
  left: ${horizontalScale(323)}px;
  top: ${verticalScale(69)}px;
`;
