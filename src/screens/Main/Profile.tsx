import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { auth } from '../../api/firebase';
import { SignupButton } from '../../ui/shared/Button';

export default function Profile() {
  const navigation = useNavigation();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.dispatch(StackActions.replace('Login'));
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
  };

  return (
    <Wrapper>
      <T>Profile</T>
      <SignupButton onPress={handleLogout}>
        <ButtonText>Logout</ButtonText>
      </SignupButton>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.primary};
`;

const T = styled(Text)`
  color: ${(p) => p.theme.colors.primary};
`;
