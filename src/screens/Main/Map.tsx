import { Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export default function Map() {
  return (
    <Wrapper>
      <Text>Map</Text>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.colors.primary};
`;
