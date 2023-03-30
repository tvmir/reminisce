import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddChat from '../../ui/components/Chat/AddChat';
import { useAppSelector } from '../../utils/hooks';
import Feather from 'react-native-vector-icons/Feather';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';

interface ChatProps {
  navigation: StackNavigationProp<RootStackParamList, 'ChatMessages'>;
}

export default function Chat({ navigation }: ChatProps) {
  const chats = useAppSelector((state) => state.chats.chats);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: '600',
            color: 'white',
            textAlign: 'center',
            paddingBottom: 15,
          }}
        >
          Messages
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateChat')}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}
          testID="create-chat"
        >
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {chats?.length === 0 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              paddingBottom: 15,
            }}
          >
            You have no messages
          </Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          removeClippedSubviews
          renderItem={({ item }) => (
            <AddChat item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}
