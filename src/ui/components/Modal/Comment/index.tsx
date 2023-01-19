import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, LogBox } from 'react-native';
import styled from 'styled-components/native';
import { useAppSelector } from '../../../../utils/hooks';
import {
  detachCommentsListener,
  detachRepliesListener,
  fetchComments,
  fetchReplies,
  writeComment,
  writeReply,
} from '../../../../contexts/services/scrapbook';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utils/scale';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { DocumentData } from 'firebase/firestore';
import CommentDetails from './CommentDetails';
import { TextInput } from 'react-native-gesture-handler';

export interface CommentProps {
  item: DocumentData;
}

export default function Comment({ item }: CommentProps) {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const [reply, setReply] = useState<string>('');
  const [replies, setReplies] = useState<any[]>([]);

  useEffect(() => {
    fetchComments(item.id, setComments);
    return () => detachCommentsListener();
  }, []);

  // console.log('COMMENT', comments);

  // useEffect(() => {
  //   // fetchReplies(item.id, comments?.id, setReplies);
  //   // comments.find((comment) => {
  //   //   fetchReplies(item.id, comment.id, setReplies);
  //   // });
  //   const currentComment = comments.find((comment) => comment.id === reply);
  //   fetchReplies(item.id, currentComment?.id, setReplies);
  //   return () => detachRepliesListener();
  // }, []);

  const handleComments = () => {
    if (comment.length > 0) {
      setComment('');
      writeComment(item.id, currentUser?.uid, comment);
    } else {
      return;
    }
  };

  console.log('REPLIES', replies);

  // const handleReplies = () => {
  //   if (reply.length > 0) {
  //     setReply('');
  //     const currentComment = comments.find((comment) => comment.id === reply);
  //     writeReply(item.id, currentUser?.uid, currentComment?.id, reply);
  //     // comments.map((comment) => {
  //     //   writeReply(item.id, currentUser?.uid, comment.id, reply);
  //     // });
  //   } else {
  //     return;
  //   }
  // };

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <FlatList
        // @ts-ignore
        data={comments}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentDetails
            item={item}
            replies={replies}
            // setReplies={setReplies}
            // reply={reply}
            // setReply={setReply}
            // handleReplies={handleReplies}
          />
        )}
      />
      <View style={{ padding: 10, paddingBottom: 40, flexDirection: 'row' }}>
        <Image
          style={{ height: 38, width: 38, borderRadius: 20, borderWidth: 1 }}
          source={{ uri: currentUser?.photoURL }}
        />
        <TextInput
          style={{
            flex: 1,
            backgroundColor: '#1f1f1f',
            borderRadius: 16,
            marginLeft: 6,
            color: '#ffffff',
            padding: 12,
          }}
          value={comment}
          returnKeyType="send"
          onSubmitEditing={handleComments}
          onChangeText={setComment}
          placeholder="Add a comment..."
          placeholderTextColor={'#797979'}
        />
      </View>
    </View>
  );
}
