import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { fetchUsersSearch } from '../../contexts/slices/users/usersSlice';
import { SearchInput } from '../../ui/shared/Input';
import { theme } from '../../ui/shared/Theme';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scale';
import { RootStackParamList } from '../../utils/types';

interface SearchProps {
  route: any;
  navigation: any;
}

export default function Search({ route, navigation }: SearchProps) {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const [input, setInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [inputBorder, setInputBorder] = useState('#1f1e1e');

  useEffect(() => {
    if (input !== search) {
      setSearch(input);
      dispatch(fetchUsersSearch(input));
    }
  }, [input]);

  return (
    <Wrapper>
      <SearchInput
        placeholder="Search"
        placeholderTextColor="#fff"
        autoCapitalize="none"
        keyboardAppearance="dark"
        onChangeText={(text) => setInput(text)}
        style={{ borderColor: inputBorder }}
        onFocus={() => setInputBorder(theme.colors.primary)}
        onBlur={() => setInputBorder('#1f1e1e')}
      />
      <FlatList
        numColumns={3}
        horizontal={false}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserContainer
          // onPress={() => navigation.navigate('UsersProfile', { users })}
          >
            <UserImage source={{ uri: item.photoURL }} />
            <UserDetailsContainer>
              <NameText>{item.name}</NameText>
              <UsernameText>@{item.username}</UsernameText>
            </UserDetailsContainer>
          </UserContainer>
        )}
        style={{ marginLeft: 25 }}
      />
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(SafeAreaView)`
  flex: 1;
`;

const UserContainer = styled(TouchableOpacity)`
  padding-top: ${verticalScale(15)}px;
  justify-content: space-between;
`;

const UserImage = styled(Image)`
  height: ${verticalScale(95)}px;
  width: ${horizontalScale(95)}px;
  border-radius: ${moderateScale(50)}px;
  background-color: #272727;
`;

const UserDetailsContainer = styled(View)`
  padding-top: ${verticalScale(6)}px;
  align-items: center;
`;

const NameText = styled(Text)`
  font-size: ${moderateScale(16)}px;
  font-weight: 500;
  color: ${(p) => p.theme.colors.primary};
`;

const UsernameText = styled(Text)`
  font-size: ${moderateScale(12)}px;
  color: ${(p) => p.theme.colors.primary};
  opacity: 0.9;
`;
