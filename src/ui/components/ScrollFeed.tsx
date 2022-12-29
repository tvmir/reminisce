import React, { useEffect, useState } from 'react';

import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
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

interface FeedCardProps {
  item: DocumentData;
  navigation: any;
}

export default function ScrollFeed({ item, navigation }: FeedCardProps) {
  const [isLiked, setisLiked] = useState({
    liked: false,
    counter: item.like_count,
  });
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const user = useUserQuery(item.uid).data;
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchLikes(item.id, currentUser?.uid).then((res) => {
      setisLiked({
        ...isLiked,
        liked: res as boolean,
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

  // Temporary styling for rn
  return (
    <>
      <Image
        style={{ flex: 1 }}
        resizeMode="cover"
        source={{
          uri: item.images[1],
        }}
      />
      <View
        style={{
          width: Dimensions.get('window').width,
          position: 'absolute',
          bottom: 0,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <View
          style={{
            alignItems: 'flex-start',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            // The most jank way possible of doing this and it don't even work like that
            onPress={() => navigation.navigate('UsersProfile', { user })}
            activeOpacity={0.8}
          >
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                borderWidth: 1,
              }}
              source={{ uri: user?.photoURL }}
            />
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 13 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              {user?.name}
            </Text>
            <Text style={{ marginTop: 1, color: 'white', fontSize: 12 }}>
              @{user?.username}
            </Text>
            <Text style={{ marginTop: 2, color: 'white', fontSize: 10 }}>
              New York, NY
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleLikeCount}
            activeOpacity={0.8}
          >
            <Ionicons color="white" name="heart" size={32} />
            <Text style={{ color: 'white', paddingHorizontal: 5 }}>
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
            <MaterialIcons color="white" name="mode-comment" size={30} />
            <Text style={{ color: 'white', paddingHorizontal: 5 }}>0</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

// Styles
