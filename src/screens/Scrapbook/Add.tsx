import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { horizontalScale, verticalScale } from '../../utils/scale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface AddProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Add'>;
}

export default function Add({ navigation }: AddProps) {
  return (
    <Wrapper>
      <Header>Start a Scrapbook</Header>
      <HeaderTwo>
        Add content to your scrapbook using the tools below.
      </HeaderTwo>
      <View style={{ paddingBottom: 50 }}>
        <View style={{ marginLeft: 140, paddingTop: 260 }}>
          <Ionicons
            name="image-outline"
            onPress={() => navigation.push('Images')}
            color="white"
            size={38}
          />
        </View>
      </View>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(View)`
  position: absolute;
  width: ${horizontalScale(229)}px;
  left: ${horizontalScale(34)}px;
  top: ${verticalScale(150)}px;
`;

const Header = styled(Text)`
  position: absolute;
  /* font-family: 'Poppins'; */
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 30px;
  color: ${(p) => p.theme.colors.primary};
`;

const HeaderTwo = styled(Text)`
  position: absolute;
  width: ${horizontalScale(204)}px;
  top: ${verticalScale(60)}px;
  /* font-family: 'Poppins'; */
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.primary};
`;
