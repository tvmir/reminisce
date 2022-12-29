import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useAppSelector, useUserQuery } from '../../../utils/hooks';
import {
  fetchComments,
  writeComment,
} from '../../../contexts/services/scrapbook';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/scale';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

export default function Comment({ item }: any) {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  // TODO: display correct user
  const user = useUserQuery(item.uid).data;
  console.log('USER', user);

  useEffect(() => {
    fetchComments(item.id, setComments);
  }, []);

  // console.log(comments);

  const handleComments = () => {
    if (comment.length > 0) {
      // console.log('comment', comment);
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
        renderItem={({ item }) => (
          <CommentsWrapper>
            <UsersImage source={{ uri: user?.photoURL }} />
            <View style={{ marginHorizontal: 12 }}>
              <UserText>{user?.name}</UserText>
              <UsernameText>@{user?.username}</UsernameText>
            </View>
            <UserText>{item.comment}</UserText>
          </CommentsWrapper>
        )}
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

const CommentsWrapper = styled(View)`
  flex: 1;
  flex-direction: row;
  padding: 10px;
`;

const UsersImage = styled(Image)`
  height: ${verticalScale(32)}px;
  width: ${horizontalScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  border-width: 1px;
`;

const CUserImage = styled(Image)`
  height: ${verticalScale(38)}px;
  width: ${horizontalScale(38)}px;
  border-radius: ${moderateScale(20)}px;
  border-width: 1px;
`;

const UserText = styled(Text)`
  color: ${(p) => p.theme.colors.primary};
`;

const UsernameText = styled(Text)`
  font-size: 11px;
  color: #cfcfcf;
`;
