import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useAppSelector, useUserQuery } from '../../utils/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scale';

interface ProfileProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;
}

export default function UsersProfile({ route }: any) {
  const currentUserScrapbooks = useAppSelector(
    (state) => state.currentUserScrapbooks.scrapbooks
  );
  const { user } = route.params;
  console.log({ user, currentUserScrapbooks });

  return (
    <Wrapper>
      <ListWrapper>
        <FlatList
          numColumns={2}
          removeClippedSubviews
          nestedScrollEnabled
          data={currentUserScrapbooks}
          ListHeaderComponent={() => (
            <DetailsWrapper>
              <ProfilePicture>
                <Image
                  style={{ height: 120, width: 120, position: 'absolute' }}
                  source={{ uri: user?.photoURL }}
                />
                <View style={{ backgroundColor: 'rgba(0,0,0, 0.5)' }} />
              </ProfilePicture>
              <HeaderNameText>{user?.name}</HeaderNameText>
              <UsernameText>@{user?.username}</UsernameText>
              <FollowageContainer>
                <FollowageSubContainer>
                  <FollowageCount>10</FollowageCount>
                  <FollowageDesc>Followers</FollowageDesc>
                </FollowageSubContainer>
                <View
                  style={{
                    flex: 1.8,
                    alignItems: 'flex-start',
                  }}
                >
                  <FollowageCount>5</FollowageCount>
                  <FollowageDesc>Following</FollowageDesc>
                </View>
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    borderColor: '#d226c1',
                    borderWidth: 1,
                    paddingVertical: 8,
                    paddingHorizontal: 25,
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: '500' }}>
                    Follow
                  </Text>
                </TouchableOpacity>
              </FollowageContainer>
              <BioText>My life through a lens</BioText>
            </DetailsWrapper>
          )}
          renderItem={({ item }) => (
            <ImgWrapper style={{ flex: 1 / 2 }}>
              <Img source={{ uri: item.images[0] }} />
            </ImgWrapper>
          )}
        />
      </ListWrapper>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${verticalScale(15)}px;
`;

const ListWrapper = styled(View)`
  margin: 10px;
`;

const DetailsWrapper = styled(View)`
  padding-bottom: ${verticalScale(30)}px;
  align-items: center;
  padding-left: ${horizontalScale(20)}px;
`;

const ProfilePicture = styled(View)`
  background-color: #656565;
  height: ${verticalScale(120)}px;
  width: ${horizontalScale(120)}px;
  border-radius: ${moderateScale(80)}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const HeaderNameText = styled(Text)`
  padding-top: ${verticalScale(8)}px;
  padding-bottom: ${verticalScale(3)}px;
  font-size: ${moderateScale(28)}px;
  font-weight: 600;
  color: ${(p) => p.theme.colors.primary};
`;

const UsernameText = styled(Text)`
  padding-bottom: ${verticalScale(10)}px;
  font-size: ${moderateScale(14)}px;
  color: #8b8e93;
`;

const FollowageContainer = styled(View)`
  flex-direction: row;
  padding-bottom: ${verticalScale(10)}px;
`;

const FollowageSubContainer = styled(View)`
  flex: 1;
  align-items: flex-start;
`;

const FollowageCount = styled(Text)`
  font-weight: bold;
  font-size: ${moderateScale(16)}px;
  color: ${(p) => p.theme.colors.primary};
`;

const FollowageDesc = styled(Text)`
  color: gray;
  font-size: ${moderateScale(14)}px;
  font-weight: 400;
`;

const ImgWrapper = styled(View)`
  height: ${verticalScale(150)}px;
`;

const Img = styled(Image)`
  flex: 1;
`;

const BioText = styled(Text)`
  padding-top: ${verticalScale(10)}px;
  font-size: ${moderateScale(14)}px;
  font-weight: 400;
  color: ${(p) => p.theme.colors.primary};
`;
