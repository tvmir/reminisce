import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, LogBox, ScrollView } from 'react-native';
import { useAppSelector } from '../../../../utils/hooks';
import {
  detachCommentsListener,
  fetchComments,
  writeComment,
} from '../../../../contexts/services/scrapbook';
import { DocumentData } from 'firebase/firestore';
import CommentDetails from './CommentDetails';
import { TextInput } from 'react-native-gesture-handler';

export interface CommentProps {
  item: DocumentData | undefined;
}

export default function Comment({ item }: CommentProps) {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<DocumentData[]>([]);
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  useEffect(() => {
    fetchComments(item?.id, setComments);
    return () => detachCommentsListener();
  }, []);

  // Store comments in state and sends them to Firestore directly
  const handleComments = () => {
    if (comment.length > 0) {
      setComment('');
      writeComment(item?.id, currentUser?.uid, comment);
    } else {
      return;
    }
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} style={{ flex: 1 }}>
      <FlatList
        data={comments}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommentDetails item={item} />}
      />

      <View
        style={{
          position: 'absolute',
          top: 430,
          padding: 10,
          flexDirection: 'row',
        }}
      >
        <Image
          style={{
            height: 38,
            width: 38,
            borderRadius: 20,
            borderWidth: 1,
          }}
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
    </ScrollView>
  );
}
