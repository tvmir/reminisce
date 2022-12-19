import styled from 'styled-components/native';
import { Pressable, TouchableOpacity } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/scale';

const SignupButton = styled(TouchableOpacity)`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${horizontalScale(342)}px;
  height: ${verticalScale(49)}px;
  left: ${horizontalScale(19)}px;
  top: ${verticalScale(617)}px;
  background: #101010;
  border: 1px solid #1f1e1e;
  border-radius: 6px;
`;

const LoginButton = styled(SignupButton)`
  top: ${verticalScale(350)}px;
`;

// Login and Verify

// Edit Profile and Followage Button
const EditProfileButton = styled(Pressable)`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 32px;
  gap: 10px;
  width: 138px;
  height: 36px;
  background: #050505;
  border: 1px solid #727477;
  border-radius: 30px;
`;

export { SignupButton, EditProfileButton, LoginButton };