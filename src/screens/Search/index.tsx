import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { fetchUsers } from '../../features/users/usersSlice';
import { SearchInput } from '../../ui/shared/Input';
import { theme } from '../../ui/shared/Theme';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export default function Search() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const [inputBorder, setInputBorder] = useState('#1f1e1e');

  return (
    <Wrapper>
      <SearchInput
        placeholder="Search"
        placeholderTextColor="#fff"
        autoCapitalize="none"
        keyboardAppearance="dark"
        onChangeText={(user) => dispatch(fetchUsers(user))}
        style={{ borderColor: inputBorder }}
        onFocus={() => setInputBorder(theme.colors.primary)}
        onBlur={() => setInputBorder('#1f1e1e')}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => <T>{item.email}</T>}
        style={{ marginTop: 20 }}
      />
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(View)`
  margin-top: 60px;
  flex: 1;
`;

const T = styled(Text)`
  color: ${(p) => p.theme.colors.primary};
`;
