import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import styled from 'styled-components/native';

export default function Loading() {
  return (
    <Wrapper>
      <LoadingLogo>reminisce</LoadingLogo>
      <Load size="small" color="white" />
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

const Load = styled(ActivityIndicator)`
  top: 30%;
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
  /* color: linear-gradient(#e66465, #9198e5); */
  color: #fff;

  /* background-color: linear-gradient(
    140.87deg,
    rgba(255, 0, 245, 0.53) -9%,
    #0feffd 2.79%,
    #ff00f5 130.43%,
    rgba(15, 239, 253, 0.98) 163.91%
  ); */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
