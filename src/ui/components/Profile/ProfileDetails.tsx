import React from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/scale';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../shared/Theme';
import {
  useAppSelector,
  useFollowMutation,
  useFollowingQuery,
} from '../../../utils/hooks';
import { auth } from '../../../api/firebase';
import { BlurView } from 'expo-blur';

const { height } = Dimensions.get('window');

export default function ProfileDetails({ user, navigation, me = true }: any) {
  const isFollowing = useFollowingQuery(auth.currentUser?.uid, user?.uid).data;
  const isFollowingMutation = useFollowMutation();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  const { width } = useWindowDimensions();

  const handleFollow = () => {
    if (isFollowing) {
      return (
        <FollowingButton
          onPress={() => {
            isFollowingMutation.mutate({
              followedUID: user?.uid,
              isFollowing,
            });
          }}
          activeOpacity={0.8}
        >
          <ButtonText>Following</ButtonText>
        </FollowingButton>
      );
    } else {
      return (
        <LinearGradient
          colors={[
            '#6b0169',
            '#5a0158',
            '#750273',
            '#850283',
            '#850283',
            '#9a0398',
          ]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{
            width: 110,
            height: 32,
            borderRadius: 20,
            padding: 1,
            right: 10,
            overflow: 'hidden',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 20,
              backgroundColor: theme.colors.background,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              isFollowingMutation.mutate({
                followedUID: user?.uid,
                isFollowing,
              });
            }}
          >
            <ButtonText>Follow</ButtonText>
          </TouchableOpacity>
        </LinearGradient>
      );
    }
  };

  return (
    <View style={{ paddingBottom: verticalScale(30) }}>
      <Animated.View style={[{ width, height: 380 }]}>
        <Image
          style={{
            width,
            height: 380,
          }}
          source={user?.photoURL ? { uri: user?.photoURL } : undefined}
        />
        <LinearGradient
          style={{ ...StyleSheet.absoluteFillObject }}
          colors={['#000000', '#00000000', '#000000']}
          locations={[1, 0.65, 0.9]}
        />
      </Animated.View>
      <BlurView
        intensity={2}
        tint="dark"
        style={{
          position: 'absolute',
          top: 310,
          left: 10,
        }}
      >
        <HeaderNameText>{user?.name}</HeaderNameText>
        <UsernameText>@{user?.username}</UsernameText>
      </BlurView>
      <FollowageContainer>
        <FollowageSubContainer>
          <FollowageCount>{user?.followers_count}</FollowageCount>
          <FollowageDesc>Followers</FollowageDesc>
        </FollowageSubContainer>

        {me ? (
          <>
            <View
              style={{
                flex: 2.1,
                alignItems: 'flex-start',
              }}
            >
              <FollowageCount>{user?.following_count}</FollowageCount>
              <FollowageDesc>Following</FollowageDesc>
            </View>
            <EditProfileButton
              onPress={() =>
                navigation.navigate('EditProfile', {
                  field: {
                    name: 'name',
                    bio: 'bio',
                  },
                  value: currentUser,
                })
              }
              activeOpacity={0.8}
            >
              <ButtonText>Edit Profile</ButtonText>
            </EditProfileButton>
          </>
        ) : (
          <>
            <View
              style={{
                flex: 2.3,
                alignItems: 'flex-start',
              }}
            >
              <FollowageCount>{user?.following_count}</FollowageCount>
              <FollowageDesc>Following</FollowageDesc>
            </View>
            {handleFollow()}
          </>
        )}
      </FollowageContainer>
    </View>
  );
}

// Styles
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

const BioText = styled(Text)`
  padding-bottom: ${verticalScale(10)}px;
  font-size: ${moderateScale(14)}px;
  color: #d7d7d7;
`;

const FollowageContainer = styled(View)`
  flex-direction: row;
  padding-top: ${verticalScale(10)}px;
  padding-bottom: ${verticalScale(12)}px;
`;

const FollowageSubContainer = styled(View)`
  flex: 1;
  padding-left: 10px;
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
  border: 0.5px solid #727477;
  border-radius: 20px;
  padding: 8px 27px;
`;

const FollowingButton = styled(TouchableOpacity)`
  border: 0.5px solid #10f0fe;
  border-radius: 20px;
  padding: 8px 25px;
  margin-right: 10px;
`;

const ButtonText = styled(Text)`
  color: ${(p) => p.theme.colors.primary};
  font-weight: 500;
`;
