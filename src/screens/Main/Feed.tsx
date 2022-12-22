import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export default function Feed() {
  return (
    <Wrapper>
      <Header></Header>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(View)``;
const Header = styled(View)`
  position: absolute;
`;
