import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const d = (1 + Math.sqrt(5)) / 2;
const MIN_HEADER_HEIGHT = 64 + 5;
const MAX_HEADER_HEIGHT = height * (1 - 1 / d);
const HEADER_DELTA = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;

export default function ProfileDetails({
  user,
  navigation,
  me = true,
  scrollY,
}: any) {
  const isFollowing = useFollowingQuery(auth.currentUser?.uid, user?.uid).data;
  const isFollowingMutation = useFollowMutation();
  // TODO: Figure this out
  const [count, setCount] = useState<any>({
    followingCount: user?.following_count,
    followersCount: user?.followers_count,
  });
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

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

  const AnimatedImageBackground =
    Animated.createAnimatedComponent(ImageBackground);

  return (
    <View style={{ paddingBottom: 30 }}>
      <Animated.View
        style={[
          {
            // ...StyleSheet.absoluteFillObject,
            height: MAX_HEADER_HEIGHT + 48,
          },
        ]}
      >
        <AnimatedImageBackground
          style={{
            ...StyleSheet.absoluteFillObject,

            transform: [
              {
                scale: scrollY.interpolate({
                  inputRange: [-MAX_HEADER_HEIGHT, 0],
                  outputRange: [4, 1],
                  extrapolateLeft: 'extend',
                  extrapolateRight: 'clamp',
                }),
              },
            ],
          }}
          source={user?.photoURL ? { uri: user?.photoURL } : undefined}
        >
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'black',
              opacity: scrollY.interpolate({
                inputRange: [-64, 0, HEADER_DELTA],
                outputRange: [0, 0.2, 1],
              }),
            }}
          />

          <LinearGradient
            style={{ ...StyleSheet.absoluteFillObject }}
            colors={['#000000', '#00000000', '#000000']}
            locations={[1, 0.6, 0.9]}
          />
        </AnimatedImageBackground>
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: scrollY.interpolate({
              inputRange: [HEADER_DELTA - 16, HEADER_DELTA],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: scrollY.interpolate({
                inputRange: [HEADER_DELTA - 8, HEADER_DELTA - 4],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          {user?.username}
        </Animated.Text>
      </Animated.View>

      <View
        style={{
          position: 'absolute',
          top: 310,
          left: 10,
        }}
      >
        <Animated.View style={{ flex: 1 }}>
          <Animated.Text
            style={{
              paddingTop: 8,
              paddingBottom: 3,
              fontSize: 28,
              fontWeight: '600',
              color: 'white',
              opacity: scrollY.interpolate({
                inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp',
              }),
            }}
          >
            {user?.name}
          </Animated.Text>
          <Animated.Text
            style={{
              paddingBottom: 10,
              color: '#8b8e93',
              opacity: scrollY.interpolate({
                inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp',
              }),
            }}
          >
            @{user?.username}
          </Animated.Text>
        </Animated.View>
      </View>
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
                    location: 'location',
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
  padding-top: ${verticalScale(20)}px;
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
  color: #808080;
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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 48 / 2 - MIN_HEADER_HEIGHT,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: 'black',
    paddingTop: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
});
