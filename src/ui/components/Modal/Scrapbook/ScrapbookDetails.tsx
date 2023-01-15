import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  fetchLikes,
  updateLikeCount,
} from '../../../../contexts/services/scrapbook';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { BlurView } from 'expo-blur';
import { commentModal } from '../../../../contexts/slices/modals/modalsSlice';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';

export default function ScrapbookDetails({ item }: any) {
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState({
    liked: false,
    counter: item.likes_count,
  });

  const openShareDialog = async () => {
    let imageProc = await ImageManipulator.manipulateAsync(item.images[0]);
    await Sharing.shareAsync(imageProc.uri);
  };

  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  useEffect(() => {
    fetchLikes(item.id, currentUser?.uid).then((res) => {
      setIsLiked({
        ...isLiked,
        liked: res,
      });
    });
  }, []);

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 30,
          left: 0,
          right: 0,
          paddingVertical: 10,
        }}
      >
        <Animatable.View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
          }}
        >
          <Text style={[{ fontSize: 32, fontWeight: 'bold', color: '#fff' }]}>
            {item.name}
          </Text>
        </Animatable.View>
        <Animated.Text
          style={[{ paddingHorizontal: 24, fontSize: 12, color: '#e0e0e0' }]}
        >
          {item.location}
        </Animated.Text>
        <Animatable.View
          style={{
            paddingVertical: 18,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            activeOpacity={0.8}
            onPress={() =>
              updateLikeCount(item.id, currentUser?.uid, isLiked, setIsLiked)
            }
          >
            <Fontisto name="heart-alt" size={24} color="#ffffff" />
            <Text
              style={{
                color: 'white',
                paddingLeft: 6,
                paddingVertical: 4,
              }}
            >
              {isLiked.counter}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(commentModal(item));
            }}
            style={{ flexDirection: 'row' }}
          >
            <MaterialCommunityIcons
              name="message-text-outline"
              size={26}
              color="#ffffff"
            />
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 6,
                paddingVertical: 4,
              }}
            >
              {item.comments_count}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openShareDialog()}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color="#ffffff"
            />
          </TouchableOpacity>
        </Animatable.View>
      </Animated.View>
    </>
  );
}
