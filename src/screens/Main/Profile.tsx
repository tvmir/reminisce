import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { auth } from '../../api/firebase';
import { SignupButton } from '../../ui/shared/Button';
import { useAppSelector } from '../../utils/hooks';

export default function Profile() {
  const scrapbooks = useAppSelector((state) => state.scrapbooks.scrapbooks);
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  console.log({ currentUser, scrapbooks });

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
      <T>{currentUser?.email}</T>
      <ListWrapper>
        <FlatList
          numColumns={2}
          horizontal={false}
          data={scrapbooks}
          renderItem={({ item }) => (
            <ImgWrapper>
              <Img source={{ uri: item.downloadURL }} />
            </ImgWrapper>
          )}
        />
      </ListWrapper>
      <SignupButton onPress={handleLogout}>
        <ButtonText>Logout</ButtonText>
      </SignupButton>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  margin-top: 60px;
`;

const ListWrapper = styled(View)`
  margin: 15px;
`;

const ImgWrapper = styled(View)`
  flex: 1;
  flex-direction: row;
`;

const Img = styled(Image)`
  flex: 2;
  aspect-ratio: 1;
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
