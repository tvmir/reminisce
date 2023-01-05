import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { auth } from '../../api/firebase';
import { useAppSelector } from '../../utils/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchCurrentUserScrapbooks } from '../../contexts/slices/scrapbooks/currentUserScrapbooksSlice';
import { SharedElement } from 'react-navigation-shared-element';

// interface ProfileProps {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;
// }

export default function Profile({ navigation }: any) {
  const currentUserScrapbooks = useAppSelector(
    (state) => state.currentUserScrapbooks.scrapbooks
  );
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  console.log({ currentUser, currentUserScrapbooks });
  // const navigation = useNavigation();
  // const [refreshing, setRefreshing] = useState(true);

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
    fetchCurrentUserScrapbooks(currentUser?.uid);
    // setRefreshing(false);
  }, []);

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
              <ProfilePictureContainer>
                <Image
                  style={{ height: 120, width: 120, position: 'absolute' }}
                  source={
                    currentUser?.photoURL
                      ? { uri: currentUser?.photoURL }
                      : undefined
                  }
                />
                <View style={{ backgroundColor: 'rgba(0,0,0, 0.5)' }} />
              </ProfilePictureContainer>
              <HeaderNameText>{currentUser?.name}</HeaderNameText>
              <UsernameText>@{currentUser?.username}</UsernameText>
              <FollowageContainer>
                <FollowageSubContainer>
                  <FollowageCount>1000</FollowageCount>
                  <FollowageDesc>Followers</FollowageDesc>
                </FollowageSubContainer>
                <View
                  style={{
                    flex: 2.3,
                    alignItems: 'flex-start',
                  }}
                >
                  <FollowageCount>52</FollowageCount>
                  <FollowageDesc>Following</FollowageDesc>
                </View>
                <EditProfileButton
                  onPress={() => navigation.navigate('EditProfile')}
                  activeOpacity={0.8}
                >
                  <EditProfileText>Edit Profile</EditProfileText>
                </EditProfileButton>
              </FollowageContainer>
              <BioText>My life through a lens</BioText>
            </DetailsWrapper>
          )}
          renderItem={({ item }) => (
            <ImgWrapper style={{ flex: 1 / 2, paddingHorizontal: 5 }}>
              <ImageWrapper>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Expanded', { item })}
                >
                  <SharedElement id={item.id}>
                    <ImageStyle source={{ uri: item.images[0] }} />
                  </SharedElement>
                </TouchableWithoutFeedback>
                <View style={{ padding: 5 }}>
                  <Text
                    style={{ color: 'white', fontSize: 13, fontWeight: '600' }}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingRight: 10,
                      paddingVertical: 2,
                    }}
                  >
                    <Ionicons name="location-sharp" size={10} color="#10F0FE" />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 9,
                        fontWeight: '400',
                        paddingHorizontal: 2,
                      }}
                    >
                      {item.location}
                    </Text>
                  </View>
                </View>
              </ImageWrapper>
            </ImgWrapper>
          )}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={fetchCurrentUserScrapbooks}
          //     size={10}
          //   />
          // }
        />
      </ListWrapper>

      {/* <SignupButton onPress={handleLogout}>
        <ButtonText>Logout</ButtonText>
      </SignupButton> */}
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${verticalScale(15)}px;
`;

const ListWrapper = styled(View)`
  /* margin: 8px; */
  padding: 8px;
`;

const DetailsWrapper = styled(View)`
  padding-bottom: ${verticalScale(30)}px;
  align-items: center;
`;

const ProfilePictureContainer = styled(View)`
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
  padding-left: 8px;
`;

const FollowageCount = styled(Text)`
  font-weight: bold;
  font-size: ${moderateScale(15)}px;
  font-weight: 500;
  color: ${(p) => p.theme.colors.primary};
`;

const FollowageDesc = styled(Text)`
  color: gray;
  font-size: ${moderateScale(13)}px;
  font-weight: 400;
`;

const ImgWrapper = styled(View)`
  height: ${verticalScale(150)}px;
`;

const EditProfileButton = styled(TouchableOpacity)`
  border: 1px solid #727477;
  border-radius: 20px;
  padding: 7px 30px;
`;

const EditProfileText = styled(Text)`
  color: ${(p) => p.theme.colors.primary};
  font-weight: 500;
`;

const BioText = styled(Text)`
  padding-top: ${verticalScale(10)}px;
  font-size: ${moderateScale(14)}px;
  font-weight: 400;
  color: ${(p) => p.theme.colors.primary};
`;

const ImageWrapper = styled(View)`
  height: 140px;
  border-radius: 6px;
  border: 0.5px solid #1f1e1e;
  padding-bottom: 25px;
`;

const ImageStyle = styled(Image)`
  height: 90%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: #727477;
`;

const ButtonText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.primary};
`;
