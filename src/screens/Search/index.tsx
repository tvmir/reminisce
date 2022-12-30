import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { fetchUsersSearch } from '../../contexts/slices/users/usersSlice';
import { SearchInput } from '../../ui/shared/Input';
import { theme } from '../../ui/shared/Theme';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
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
        numColumns={1}
        horizontal={false}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item } = route.params) => (
          <TouchableOpacity
            // onPress={() => navigation.navigate('UsersProfile', { item })}
            style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
          >
            <T>{item.username}</T>
            <Image
              style={{
                backgroundColor: '#8e8e8e',
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
              source={{ uri: item.photoURL }}
            />
          </TouchableOpacity>
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

const T = styled(Text)`
  flex: 1;
  font-size: 16px;
  color: ${(p) => p.theme.colors.primary};
`;
