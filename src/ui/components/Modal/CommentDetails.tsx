import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { useUserQuery } from '../../../utils/hooks';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/scale';
import { CommentProps } from './Comment';

export default function CommentDetails({ item }: CommentProps) {
  const user = useUserQuery(item.uid).data;
  return (
    <CommentsWrapper>
      <UsersImage source={{ uri: user?.photoURL }} />
      <View style={{ marginHorizontal: 12 }}>
        <UserText>{user?.name}</UserText>
        <UsernameText>@{user?.username}</UsernameText>
      </View>
      <UserText>{item.comment}</UserText>
    </CommentsWrapper>
  );
}

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

const UserText = styled(Text)`
  color: ${(p) => p.theme.colors.primary};
`;

const UsernameText = styled(Text)`
  font-size: 11px;
  color: #cfcfcf;
`;
