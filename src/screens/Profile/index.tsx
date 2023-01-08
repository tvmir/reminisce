import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { StackActions } from '@react-navigation/native';
import { auth } from '../../api/firebase';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scale';
import { fetchCurrentUserScrapbooks } from '../../contexts/slices/scrapbooks/currentUserScrapbooksSlice';
import ProfileDetails from '../../ui/components/Profile/ProfileDetails';
import Animated from 'react-native-reanimated';
import TabIndicator, { data } from '../../ui/components/Profile/TabIndicator';

// interface ProfileProps {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;
// }

export default function Profile({ route, navigation }: any) {
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const currentUserScrapbooks = useAppSelector(
    (state) => state.currentUserScrapbooks.scrapbooks
  );
  console.log({ currentUser, currentUserScrapbooks });

  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();

  const onItemPress = (itemIdx: any) => {
    // @ts-ignore
    ref?.current?.scrollToOffset({
      offset: itemIdx * width,
    });
  };

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

  // TODO: Get refresh working
  useEffect(() => {
    dispatch(fetchCurrentUserScrapbooks(currentUser?.uid)).then(() =>
      setRefreshing(false)
    );
  }, [refreshing]);

  return (
    <Wrapper>
      <ListWrapper>
        <FlatList
          numColumns={2}
          initialNumToRender={4}
          removeClippedSubviews
          nestedScrollEnabled
          refreshing={refreshing}
          onRefresh={fetchCurrentUserScrapbooks}
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
              <TabIndicator
                data={data}
                scrollX={scrollX}
                onItemPress={onItemPress}
              />
            </DetailsWrapper>
          )}
          renderItem={({ item }) => (
            <>
              <ProfileDetails item={item} navigation={navigation} />
            </>
            // AboutUserDetails
          )}
        />
      </ListWrapper>

      {/* <Button title="Logout" onPress={handleLogout} /> */}
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
