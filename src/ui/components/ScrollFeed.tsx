import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
  useUserQuery,
} from '../../utils/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchLikes, updateLikes } from '../../contexts/services/scrapbook';
import { DocumentData } from 'firebase/firestore';
import { commentModal } from '../../contexts/slices/modals/modalsSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabParamList, RootStackParamList } from '../../utils/types';
import moment from 'moment';

interface FeedCardProps {
  item: DocumentData;
  navigation: any;
}

export default function ScrollFeed({ item, navigation }: FeedCardProps) {
  const [isLiked, setisLiked] = useState({
    liked: false,
    counter: item.like_count ? item.like_count : 0,
  });
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const user = useUserQuery(item.uid).data;
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchLikes(item.id, currentUser?.uid).then((res) => {
      setisLiked({
        ...isLiked,
        liked: res,
      });
    });
  }, []);

  const handleLikeCount = () => {
    setisLiked({
      liked: !isLiked.liked,
      counter: isLiked.liked ? isLiked.counter - 1 : isLiked.counter + 1,
    });
    updateLikes(item.id, currentUser?.uid, isLiked.liked);
  };

  return (
    <>
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
            onPress={() => navigation.navigate('UsersProfile', { user })}
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
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              {user?.name}
            </Text>
            <Text
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
                style={{
                  marginTop: 2,
                  color: 'white',
                  fontSize: 10,
                  opacity: 0.9,
                }}
              >
                {item.location}
              </Text>
              <Text
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
                style={{
                  marginTop: 2,
                  color: 'white',
                  fontSize: 10,
                  opacity: 0.9,
                }}
              >
                {moment(item.createdAt.toDate()).fromNow()}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 20,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleLikeCount}
            activeOpacity={0.8}
          >
            <Ionicons color="white" name="heart" size={26} />
            <Text style={{ color: 'white', paddingHorizontal: 6 }}>
              {isLiked.counter}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => dispatch(commentModal(item))}
            activeOpacity={0.8}
          >
            <MaterialIcons color="white" name="mode-comment" size={24} />
            <Text style={{ color: 'white', paddingHorizontal: 6 }}>0</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

// Styles
