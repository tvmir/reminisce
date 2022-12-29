import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export default function Map() {
  return (
    <Wrapper>
      <T>Map</T>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const T = styled(Text)`
  color: #fff;
`;
