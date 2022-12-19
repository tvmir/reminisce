import { SafeAreaView, Text } from 'react-native';
import React, { useEffect } from 'react';
import { SignupButton } from '../ui/shared/Button';
import styled from 'styled-components/native';
import { auth } from '../api/firebase';
import { StackActions, useNavigation } from '@react-navigation/core';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../context/actions';
import { connect } from 'react-redux';
import { AppDispatch } from '../context/store';

interface UserProps {
  currentUser: any;
  fetchUser: () => void;
}

function Feed({ currentUser, fetchUser }: UserProps) {
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

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(currentUser);

  return (
    <Wrapper>
      <Text>Email: {currentUser?.email} is logged in</Text>
      <SignupButton onPress={handleLogout}>
        <ButtonText>Logout</ButtonText>
      </SignupButton>
    </Wrapper>
  );
}

const mapStateToProps = (state: any) => ({
  currentUser: state.userState.currentUser,
});

const mapDispatchProps = (dispatch: AppDispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Feed);

const Wrapper = styled(SafeAreaView)`
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
