import styled from "styled-components/native";
import { Pressable } from "react-native";

const SignupButton = styled(Pressable)`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 10px;
  gap: 10px;
  position: absolute;
  width: 342px;
  height: 49px;
  left: 24px;
  top: 617px;
  background: #101010;
  border: 1px solid #1f1e1e;
  border-radius: 6px;
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

export { SignupButton, EditProfileButton };
