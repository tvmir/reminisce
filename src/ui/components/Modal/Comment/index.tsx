import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useAppSelector } from '../../../../utils/hooks';
import {
  detachCommentsListener,
  fetchComments,
  writeComment,
} from '../../../../contexts/services/scrapbook';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utils/scale';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { DocumentData } from 'firebase/firestore';
import CommentDetails from './CommentDetails';

export interface CommentProps {
  item: DocumentData;
}

export default function Comment({ item }: CommentProps) {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  useEffect(() => {
    fetchComments(item.id, setComments);
    return () => detachCommentsListener();
  }, []);

  const handleComments = () => {
    if (comment.length > 0) {
      setComment('');
      writeComment(item.id, currentUser?.uid, comment);
    } else {
      return;
    }
  };

  return (
    <Wrapper>
      <FlatList
        // @ts-ignore
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommentDetails item={item} />}
      />
      <WrapperInput>
        <CUserImage source={{ uri: currentUser?.photoURL }} />
        <Input
          value={comment}
          returnKeyType="send"
          onSubmitEditing={handleComments}
          onChangeText={setComment}
          placeholder="Add a comment..."
          placeholderTextColor={'#797979'}
        />
      </WrapperInput>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(View)`
  flex: 1;
  justify-content: flex-end;
`;

const WrapperInput = styled(View)`
  padding: 10px;
  padding-bottom: ${verticalScale(40)}px;
  flex-direction: row;
`;

const Input = styled(BottomSheetTextInput)`
  flex: 1;
  background-color: #1f1f1f;
  align-self: stretch;
  border-radius: ${moderateScale(16)}px;
  margin-left: ${horizontalScale(6)}px;
  color: #ffffff;
  padding: 10px;
`;

const CUserImage = styled(Image)`
  height: ${verticalScale(38)}px;
  width: ${horizontalScale(38)}px;
  border-radius: ${moderateScale(20)}px;
  border-width: 1px;
`;
