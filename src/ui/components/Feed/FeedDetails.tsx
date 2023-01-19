import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useAppSelector, useUserQuery } from '../../../utils/hooks';
import {
  fetchLikes,
  updateLikeCount,
} from '../../../contexts/services/scrapbook';
import { DocumentData } from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import moment from 'moment';

interface FeedCardProps {
  item: DocumentData;
  navigation: any;
}

export default function FeedDetails({ item, navigation }: FeedCardProps) {
  const [isLiked, setIsLiked] = useState({
    liked: false,
    counter: item.likes_count,
  });
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const user = useUserQuery(item.uid).data;

  useEffect(() => {
    fetchLikes(item.id, currentUser?.uid).then((res) => {
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
              if (user?.uid !== currentUser?.uid) {
                navigation.navigate('UsersProfile', {
                  user,
                });
              } else {
                navigation.navigate('Profile');
              }
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
              {item.name}
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
                {moment(item.createdAt.toDate()).fromNow(true)}
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
                {item.location.name}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#fff' }}>
          <TouchableOpacity
            onPress={() =>
              updateLikeCount(item.id, currentUser?.uid, isLiked, setIsLiked)
            }
            activeOpacity={0.8}
            style={{
              backgroundColor: isLiked.liked ? '#770573' : '#1E1E1E',
              opacity: 0.9,
              paddingLeft: 5,
              paddingTop: 6,
              borderRadius: 30,
              position: 'absolute',
              bottom: 35,
              right: 8,
              width: 60,
              height: 30,
              flexDirection: 'row',
            }}
          >
            <Octicons color={'#fff'} name="heart-fill" size={20} />
            {/* <Text
              style={{
                color: 'white',
                // fontSize: 12,
                paddingHorizontal: 15,
                paddingTop: 2,
                fontWeight: '700',
              }}
            >
              {isLiked.counter > 0 ? isLiked.counter : null}
            </Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
