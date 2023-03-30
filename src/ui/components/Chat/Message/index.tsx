import React, { useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import { useAppSelector, useMessage } from '../../../../utils/hooks';
import { TextInput } from 'react-native-gesture-handler';
import UserChatMessage from './UserChatMessage';
import { writeMessage } from '../../../../contexts/services/chat';
import Header from '../../Extra/Header';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../utils/types';

export interface MessageProps {
  route: RouteProp<{ params: { cid: string } }, 'params'>;
  navigation: StackNavigationProp<RootStackParamList, 'ChatMessages'>;
}

export default function Message({ route, navigation }: MessageProps) {
  const { cid } = route.params;
  const { messages } = useMessage(cid);
  const [message, setMessage] = useState<string>('');
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  // Store messages in state and send to Firestore
  const handleMessages = (): void => {
    if (message.length > 0) {
      setMessage('');
      writeMessage(cid, message);
    } else {
      return;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Chat" navigation={navigation} close={false} />
      <FlatList
        data={messages}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UserChatMessage item={item} />}
      />

      <View
        style={{
          position: 'absolute',
          top: 710,
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
          value={message}
          returnKeyType="send"
          onSubmitEditing={handleMessages}
          onChangeText={setMessage}
          placeholder="Send a message..."
          placeholderTextColor={'#797979'}
        />
      </View>
    </View>
  );
}
