import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  fetchLikes,
  updateLikeCount,
} from '../../../contexts/services/scrapbook';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { commentModal } from '../../../contexts/slices/modals/modalsSlice';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';
import { DocumentData } from 'firebase/firestore';

interface ScrapbookInteractionsBarProps {
  item: DocumentData | undefined;
}

export default function ScrapbookInteractionsBar({
  item,
}: ScrapbookInteractionsBarProps) {
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState({
    liked: false,
    counter: item?.likes_count as number,
  });
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  // Used for sharing images to other apps
  const openShareDialog = async (): Promise<void> => {
    let imageProc = await ImageManipulator.manipulateAsync(item?.images[0]);
    await Sharing.shareAsync(imageProc.uri);
  };

  useEffect(() => {
    fetchLikes(item?.id, currentUser?.uid).then((res) => {
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
            paddingVertical: 18,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            activeOpacity={0.8}
            onPress={() =>
              updateLikeCount(item?.id, currentUser?.uid, isLiked, setIsLiked)
            }
          >
            {isLiked.liked ? (
              <AntDesign name="heart" size={25} color="#ffffff" />
            ) : (
              <AntDesign name="hearto" size={25} color="#ffffff" />
            )}
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
              {item?.comments_count}
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
