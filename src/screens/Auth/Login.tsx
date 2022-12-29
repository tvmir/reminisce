import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { auth } from '../../api/firebase';
import { LoginButton } from '../../ui/shared/Button';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scale';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { login } from '../../contexts/slices/users/currentUserSlice';

interface LoginProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });
    return unsub;
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper behavior="padding">
        <Header>Login</Header>
        <InputContainer>
          <Input
            placeholder="Email"
            placeholderTextColor="#edededb2"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            keyboardAppearance="dark"
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            placeholderTextColor="#edededb2"
            value={password}
            keyboardAppearance="dark"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </InputContainer>

        <LoginButton onPress={() => login(email, password)} activeOpacity={0.8}>
          <ButtonText>Login</ButtonText>
        </LoginButton>

        <BottomContainer>
          <BottomText>Don't have an account?</BottomText>
          <BottomTextBtn onPress={() => navigation.push('Signup')}>
            Signup
          </BottomTextBtn>
        </BottomContainer>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
}

// Styles
const Wrapper = styled(KeyboardAvoidingView)`
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

const Header = styled(Text)`
  position: absolute;
  height: ${verticalScale(42)}px;
  left: ${horizontalScale(21)}px;
  top: ${verticalScale(100)}px;
  /* font-family: 'Poppins'; */
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
  color: ${(p) => p.theme.colors.primary};
`;

const InputContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px 6px 0px 0px;
  position: absolute;
  height: ${horizontalScale(157)}px;
  width: ${verticalScale(342)}px;
  left: ${horizontalScale(19)}px;
  top: ${verticalScale(180)}px;
`;

const Input = styled(TextInput)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 15px;
  margin-top: ${verticalScale(20)}px;
  width: 100%;
  background: #050505;
  border: 1px solid #1d1d1d;
  border-radius: ${moderateScale(4)}px;
  color: white;
`;

const BottomContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  color: white;
  position: absolute;
  left: 25%;
  top: 92%;
`;

const BottomText = styled(Text)`
  width: 56%;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #747980;
`;

const BottomTextBtn = styled(Text)`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #10f0fe;
`;
