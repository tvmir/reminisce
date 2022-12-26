import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { auth, db } from '../../api/firebase';
import { SignupButton } from '../../ui/shared/Button';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scale';
import { RootStackParamList } from '../../utils/types';

interface SignupProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
}

export default function Signup({ navigation }: SignupProps) {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Login');
      }
    });
    return unsub;
  }, []); // runs once

  // Handling signup and login functionalities
  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // Adding user details to our Firestore database
        await updateProfile(user, {
          displayName: username,
        });

        await setDoc(doc(db, 'users', user.uid), {
          name,
          username: user.displayName,
          email: user.email,
        });

        console.log(
          'Signing up with: \n',
          `Email: ${email}\n`,
          `Username: ${username}\n`
        );
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper behavior="padding">
        <Header>Signup</Header>
        <InputContainer>
          <InputBorder>
            <Input
              placeholder="Name"
              placeholderTextColor="#edededb2"
              autoCorrect={false}
              value={name}
              keyboardAppearance="dark"
              onChangeText={(text) => setName(text)}
            />
          </InputBorder>
          <InputBorder>
            <Input
              placeholder="Username"
              placeholderTextColor="#edededb2"
              value={username}
              keyboardAppearance="dark"
              onChangeText={(text) => setUsername(text)}
            />
          </InputBorder>
          <InputBorder>
            <Input
              placeholder="Email"
              placeholderTextColor="#edededb2"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              keyboardAppearance="dark"
              onChangeText={(text) => setEmail(text)}
            />
          </InputBorder>
          <InputBorder>
            <Input
              placeholder="Password"
              placeholderTextColor="#edededb2"
              value={password}
              keyboardAppearance="dark"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </InputBorder>
        </InputContainer>
        <SignupButton onPress={handleSignup} activeOpacity={0.8}>
          <ButtonText>Sign Up</ButtonText>
        </SignupButton>

        <BottomContainer>
          <BottomText>Already have an account?</BottomText>
          <BottomTextBtn onPress={() => navigation.navigate('Login')}>
            Login
          </BottomTextBtn>
        </BottomContainer>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
}

// Styles
const Wrapper = styled(KeyboardAvoidingView)`
  flex: 1;
  align-items: center;
  justify-content: center;
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
  left: ${horizontalScale(21)}px;
  top: ${verticalScale(100)}px;
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
  position: absolute;
  width: 90%;
  left: ${horizontalScale(19)}px;
  top: ${verticalScale(180)}px;
`;

const InputBorder = styled(View)`
  width: 100%;
  border-bottom-color: #232222;
  border-bottom-width: 1px;
`;

const Input = styled(TextInput)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 15px;
  margin-top: ${verticalScale(20)}px;
  width: 100%;
  /* background: #050505; */
  /* border: 1px dotted #6c2424; */
  /* border-radius: ${moderateScale(5)}px; */
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
  width: 60%;
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
