import React from 'react';
import { DocumentData } from 'firebase/firestore';
import moment from 'moment';
import { View, Text, Image } from 'react-native';
import { auth } from '../../../../api/firebase';
import { useUserQuery } from '../../../../utils/hooks';
import { theme } from '../../../shared/theme';

interface UserChatMessageProps {
  item: DocumentData | undefined;
}

export default function UserChatMessage({ item }: UserChatMessageProps) {
  const user = useUserQuery(item?.uid).data;
  const isCurrentUser = item?.uid === auth.currentUser?.uid;

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <View
        style={
          isCurrentUser
            ? {
                flex: 1,
                flexDirection: 'row-reverse',
                padding: 15,
              }
            : {
                flex: 1,
                flexDirection: 'row',
                padding: 15,
              }
        }
      >
        <Image
          style={{ height: 32, width: 32, borderRadius: 16, borderWidth: 1 }}
          source={{ uri: user?.photoURL }}
        />
        <View
          style={
            isCurrentUser
              ? {
                  marginHorizontal: 10,
                  backgroundColor: '#9E079A',
                  borderRadius: 12,
                  borderBottomRightRadius: 4,
                  paddingHorizontal: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              : {
                  marginHorizontal: 10,
                  backgroundColor: '#202122',
                  borderRadius: 12,
                  borderBottomLeftRadius: 4,
                  paddingHorizontal: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }
          }
        >
          <Text
            style={{ color: theme.colors.primary, fontSize: 13, paddingTop: 2 }}
          >
            {item?.message}
          </Text>
        </View>
        <Text
          style={
            isCurrentUser
              ? {
                  position: 'absolute',
                  left: 57,
                  top: 50,
                  fontSize: 10,
                  color: '#727477',
                }
              : {
                  position: 'absolute',
                  left: 57,
                  top: 50,
                  fontSize: 10,
                  color: '#727477',
                }
          }
        >
          {moment(item?.createdAt?.toDate()).format('LT')}
        </Text>
      </View>
    </View>
  );
}
