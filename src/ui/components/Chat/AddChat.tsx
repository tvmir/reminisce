import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { auth } from '../../../api/firebase';
import { useUserQuery } from '../../../utils/hooks';
import moment from 'moment';
import { DocumentData } from 'firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../utils/types';

interface ChatDetailsProps {
  item: DocumentData | undefined;
  navigation: StackNavigationProp<RootStackParamList, 'ChatMessages'>;
}

export default function AddChat({ item, navigation }: ChatDetailsProps) {
  const { data: user } = useUserQuery(
    item?.members[0] === auth.currentUser?.uid!
      ? item?.members[1]
      : item?.members[0]
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}
        onPress={() => navigation.navigate('ChatMessages', { cid: item?.id })}
        activeOpacity={0.8}
        testID="open-chat"
      >
        <Image
          style={{
            backgroundColor: 'gray',
            height: 60,
            aspectRatio: 1,
            borderRadius: 30,
            marginRight: 16,
          }}
          source={{ uri: user?.photoURL }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, color: 'white', fontWeight: '500' }}>
            {item?.name}
          </Text>
          <Text style={{ fontSize: 13, color: '#999797' }}>
            {item?.recent_message}
          </Text>
        </View>
        <Text style={{ color: 'white', paddingRight: 8 }}>
          {moment(item?.updatedAt?.toDate()).fromNow(true)
            ? moment(item?.updatedAt?.toDate()).fromNow(true)
            : '1s'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
