import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export default function Search() {
  return (
    <Wrapper>
      <T>Search</T>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const T = styled(Text)`
  color: ${(p) => p.theme.colors.primary};
`;
