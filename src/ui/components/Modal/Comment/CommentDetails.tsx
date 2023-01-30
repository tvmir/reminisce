import React, { useEffect } from 'react';
import { View, Text, Image, LogBox } from 'react-native';
import { useUserQuery } from '../../../../utils/hooks';
import { theme } from '../../../shared/theme';
import moment from 'moment';
import { DocumentData } from 'firebase/firestore';

interface CommentDetailsProps {
  item: DocumentData | undefined;
}

export default function CommentDetails({ item }: CommentDetailsProps) {
  const user = useUserQuery(item?.uid).data;
  const inputRef = React.useRef<Text>();

  useEffect(() => {
    LogBox.ignoreLogs([
      `undefined is not an object (evaluating '_n7.indexOf')]`,
    ]);
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
      <Image
        style={{ height: 32, width: 32, borderRadius: 16, borderWidth: 1 }}
        source={{ uri: user?.photoURL }}
      />
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ color: theme.colors.primary, right: 2, fontSize: 13 }}>
          @{user?.username}
        </Text>
        <Text
          style={{ color: theme.colors.primary, fontSize: 13, paddingTop: 2 }}
        >
          {item?.comment}
        </Text>
        <View style={{ flexDirection: 'row', paddingTop: 3 }}>
          <Text
            onPress={() => () => inputRef?.current?.focus()}
            style={{ color: '#cfcfcf', fontSize: 11 }}
          >
            Reply
          </Text>
          <Text style={{ color: '#cfcfcf', fontSize: 11, paddingLeft: 10 }}>
            {moment(item?.createdAt?.toDate()).fromNow(true)
              ? moment(item?.createdAt?.toDate()).fromNow(true)
              : '1s'}
          </Text>
        </View>
      </View>
    </View>
  );
}
