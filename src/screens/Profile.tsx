import { Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export default function Profile() {
  return (
    <Wrapper>
      <Text>Profile</Text>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
