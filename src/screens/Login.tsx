import { useNavigation } from '@react-navigation/core';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { auth } from '../api/firebase';
import { LoginButton, SignupButton } from '../components/ui/Button';
import { horizontalScale, moderateScale, verticalScale } from '../util/scale';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // @ts-ignore
        navigation.navigate('Feed');
      }
    });
    return unsub;
  }, []); // runs once

  // Handling signup and login functionalities
  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Signing up with', user.email);
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logging in with', user.email);
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
  };

  return (
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
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          placeholder="Password"
          placeholderTextColor="#edededb2"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </InputContainer>

      <SignupButton onPress={handleSignup} activeOpacity={0.8}>
        <ButtonText>Sign Up</ButtonText>
      </SignupButton>

      <LoginButton onPress={handleLogin} activeOpacity={0.8}>
        <ButtonText>Login</ButtonText>
      </LoginButton>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.colors.background};
`;

const ButtonText = styled(Text)`
  /* font-family: 'system font'; */
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.primary};
`;

const Header = styled(Text)`
  position: absolute;
  width: ${horizontalScale(76)};
  height: ${verticalScale(42)};
  left: ${horizontalScale(21)};
  top: ${verticalScale(110)};
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
  height: ${horizontalScale(157)};
  width: ${verticalScale(342)};
  left: ${horizontalScale(19)};
  top: ${verticalScale(180)};
`;

const Input = styled(TextInput)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 15px;
  margin-top: ${verticalScale(20)};
  width: 100%;
  background: #050505;
  border: 1px solid #1d1d1d;
  border-radius: ${moderateScale(4)};
  color: white;
`;
