import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { theme } from '../../ui/shared/theme';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { RootStackParamList } from '../../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchUsers } from '../../contexts/slices/users/usersSlice';

interface UserSearchProps {
  navigation: StackNavigationProp<
    RootStackParamList,
    'Profile',
    'UsersProfile'
  >;
}

export default function SearchUsers({ navigation }: UserSearchProps) {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  useEffect(() => {
    if (input !== search) {
      setSearch(input);
    }
  }, [input]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 10,
      }}
    >
      <FlatList
        numColumns={3}
        horizontal={false}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              item.uid !== currentUser?.uid
                ? navigation.navigate('UsersProfile', {
                    user: item,
                  })
                : navigation.navigate('Profile');
            }}
            style={{
              flex: 1,
              paddingTop: 10,
              paddingBottom: 10,
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                height: 95,
                width: 95,
                borderRadius: 50,
                backgroundColor: '#272727',
              }}
              source={{ uri: item.photoURL }}
            />
            <View style={{ paddingTop: 8 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: theme.colors.primary,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.colors.primary,
                  opacity: 0.8,
                }}
              >
                @{item.username}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
