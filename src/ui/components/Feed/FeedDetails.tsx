import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useAppSelector, useUserQuery } from '../../../utils/hooks';
import {
  fetchLikes,
  updateLikeCount,
} from '../../../contexts/services/scrapbook';
import { DocumentData } from 'firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../utils/types';

// Global time abbreviations
moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1s',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1Y',
    yy: '%dY',
  },
});

interface FeedDetailsProps {
  item: DocumentData | undefined;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export default function FeedDetails({ item, navigation }: FeedDetailsProps) {
  const [isLiked, setIsLiked] = useState({
    liked: false,
    counter: item?.likes_count as number,
  });
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const user = useUserQuery(item?.uid).data;

  useEffect(() => {
    fetchLikes(item?.id, currentUser?.uid).then((res) => {
      setIsLiked({
        ...isLiked,
        liked: res,
      });
    });
  }, []);

  return (
    <View style={{ flex: 1, height: 80 }}>
      <View
        style={{
          bottom: 10,
          padding: 1,
          paddingTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <View
          style={{
            alignItems: 'flex-start',
            flexDirection: 'row',
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              user?.uid !== currentUser?.uid
                ? navigation.navigate('UsersProfile', {
                    user,
                  })
                : navigation.navigate('Profile');
            }}
            activeOpacity={0.8}
          >
            {user?.photoURL.length > 0 ? (
              <Image
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 23,
                  borderWidth: 1,
                }}
                source={{ uri: user?.photoURL }}
              />
            ) : null}
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 6 }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
            >
              {item?.name}
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                marginTop: 1,
                color: 'white',
                fontSize: 12,
              }}
            >
              @{user?.username}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  marginTop: 2,
                  color: 'white',
                  fontSize: 10,
                  opacity: 0.9,
                }}
              >
                {moment(item?.createdAt?.toDate()).fromNow(true)
                  ? moment(item?.createdAt?.toDate()).fromNow(true)
                  : '1s'}
              </Text>

              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  marginTop: 2,
                  color: 'white',
                  fontSize: 10,
                  paddingHorizontal: 3,
                  opacity: 0.9,
                }}
              >
                ·
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: 2,
                  color: 'white',
                  fontSize: 10,
                  opacity: 0.9,
                  width: '80%',
                }}
              >
                {item?.location.name}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#fff' }}>
          <TouchableOpacity
            onPress={() =>
              updateLikeCount(item?.id, currentUser?.uid, isLiked, setIsLiked)
            }
            activeOpacity={0.8}
            style={{
              backgroundColor: isLiked.liked ? '#d20b3c' : '#1E1E1E',
              opacity: 0.9,
              paddingLeft: 7,
              paddingTop: 4.5,
              borderRadius: 50,
              position: 'absolute',
              bottom: 30,
              right: 5,
              width: 60,
              height: 30,
              flexDirection: 'row',
            }}
            testID="like-btn"
          >
            {isLiked.liked ? (
              <AntDesign color={'#fff'} name="heart" size={22} />
            ) : (
              <AntDesign color={'#fff'} name="hearto" size={22} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
