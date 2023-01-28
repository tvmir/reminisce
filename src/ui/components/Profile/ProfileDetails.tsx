import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../shared/Theme';
import {
  useAppSelector,
  useFollowMutation,
  useFollowingQuery,
} from '../../../utils/hooks';
import { auth } from '../../../api/firebase';
import { DocumentData } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');
const d = (1 + Math.sqrt(5)) / 2;
const MIN_HEADER_HEIGHT = 64 + 5;
const MAX_HEADER_HEIGHT = height * (1 - 1 / d);
const HEADER_DELTA = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;

interface ProfileDetailsProps {
  user: DocumentData | undefined;
  me: boolean;
  scrollY: any;
}

export default function ProfileDetails({
  user,
  me = true,
  scrollY,
}: ProfileDetailsProps) {
  const isFollowing = useFollowingQuery(auth.currentUser?.uid!, user?.uid).data;
  const isFollowingMutation = useFollowMutation();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const navigation = useNavigation();

  const handleFollow = () => {
    if (isFollowing) {
      return (
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderColor: '#10f0fe',
            borderRadius: 20,
            padding: 8,
            paddingLeft: 25,
            paddingRight: 25,
            marginRight: 10,
          }}
          onPress={() => {
            isFollowingMutation.mutate({
              followedUID: user?.uid,
              isFollowing,
            });
          }}
          activeOpacity={0.8}
        >
          <Text style={{ color: theme.colors.primary, fontWeight: '500' }}>
            Following
          </Text>
        </TouchableOpacity>
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
            <Text style={{ color: theme.colors.primary, fontWeight: '500' }}>
              Follow
            </Text>
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
            height: MAX_HEADER_HEIGHT + 48,
          },
        ]}
      >
        <AnimatedImageBackground
          style={{
            // ...StyleSheet.absoluteFillObject,
            height: MAX_HEADER_HEIGHT,

            transform: [
              {
                scale: scrollY.interpolate({
                  inputRange: [-MAX_HEADER_HEIGHT, 0],
                  outputRange: [3, 1],
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
              backgroundColor: 'transparent',
              opacity: scrollY.interpolate({
                inputRange: [-64, 0, HEADER_DELTA],
                outputRange: [0, 0.2, 1],
              }),
            }}
          />

          <LinearGradient
            style={{ ...StyleSheet.absoluteFillObject }}
            colors={['#000000', 'transparent', '#000000']}
            locations={[1, 0.6, 0.9]}
          />
        </AnimatedImageBackground>
      </Animated.View>

      <View
        style={{
          position: 'absolute',
          top: 270,
          left: 10,
        }}
      >
        <Animated.View style={{ flex: 1 }}>
          <Animated.Text
            style={{
              paddingBottom: 3,
              fontSize: 28,
              fontWeight: '600',
              color: 'white',
              opacity: scrollY.interpolate({
                inputRange: [-MAX_HEADER_HEIGHT, 0, MAX_HEADER_HEIGHT / 2],
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
                inputRange: [-MAX_HEADER_HEIGHT, 0, MAX_HEADER_HEIGHT / 2],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp',
              }),
            }}
          >
            @{user?.username}
          </Animated.Text>
        </Animated.View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 20,
          // paddingBottom: 10,
        }}
      >
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: 15,
              fontWeight: '500',
            }}
          >
            {user?.followers_count}
          </Text>
          <Text style={{ color: '#808080', fontSize: 13, fontWeight: '400' }}>
            Followers
          </Text>
        </View>

        {me ? (
          <>
            <View
              style={{
                flex: 2.1,
                alignItems: 'flex-start',
              }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 15,
                  fontWeight: '500',
                }}
              >
                {user?.following_count}
              </Text>
              <Text
                style={{ color: '#808080', fontSize: 13, fontWeight: '400' }}
              >
                Following
              </Text>
            </View>
            <TouchableOpacity
              style={{
                borderWidth: 0.5,
                borderColor: '#727477',
                borderRadius: 20,
                padding: 8,
                paddingLeft: 27,
                paddingRight: 27,
              }}
              onPress={() =>
                // @ts-ignore
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
              <Text style={{ color: theme.colors.primary, fontWeight: '500' }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View
              style={{
                flex: 2.3,
                alignItems: 'flex-start',
              }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 15,
                  fontWeight: '500',
                }}
              >
                {user?.following_count}
              </Text>
              <Text
                style={{ color: '#808080', fontSize: 13, fontWeight: '400' }}
              >
                Following
              </Text>
            </View>
            {handleFollow()}
          </>
        )}
      </View>
    </View>
  );
}
