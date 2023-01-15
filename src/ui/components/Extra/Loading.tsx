import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export default function Loading() {
  return (
    <Wrapper>
      <LoadingLogo>reminisce</LoadingLogo>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.colors.background};
`;

const LoadingLogo = styled(Text)`
  position: absolute;
  width: 130px;
  height: 33px;
  left: 120px;
  top: 405px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 27px;
  line-height: 33px;

  text-align: center;
  letter-spacing: 0.02em;
  color: #fff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
