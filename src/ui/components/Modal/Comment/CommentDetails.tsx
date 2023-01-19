import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList, LogBox } from 'react-native';
import styled from 'styled-components/native';
import { useUserQuery } from '../../../../utils/hooks';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utils/scale';
import { CommentProps } from '.';
import { theme } from '../../../shared/Theme';
import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1s',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1Y',
    yy: '%dY',
  },
});

export default function CommentDetails({
  item,
  replies,
  setReplies,
  reply,
  setReply,
  handleReplies,
}: any) {
  const user = useUserQuery(item.uid).data;
  const inputRef = React.useRef<any>();

  // const [replies, setReplies] = React.useState<string[]>(['yp', 'yp', 'yp']);
  // const [reply, setReply] = React.useState<string>('');
  const [showReplies, setShowReplies] = useState<boolean>(false);

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
          {item.comment}
        </Text>
        <View style={{ flexDirection: 'row', paddingTop: 3 }}>
          <Text
            onPress={() => () => inputRef?.current?.focus()}
            style={{ color: '#cfcfcf', fontSize: 11 }}
          >
            Reply
          </Text>
          <Text style={{ color: '#cfcfcf', fontSize: 11, paddingLeft: 10 }}>
            {moment(item.createdAt.toDate()).fromNow(true)}
          </Text>
        </View>
        {replies.length > 0 && (
          <>
            <Text
              style={{
                color: '#cfcfcf',
                fontSize: 11,
                paddingTop: 8,
                paddingBottom: 5,
              }}
              onPress={() => setShowReplies(!showReplies)}
            >
              View {replies.length} replies...
            </Text>
            {/* {showReplies && ( */}
            <>
              <FlatList
                data={replies}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        padding: 10,
                      }}
                    >
                      <Image
                        style={{
                          height: 32,
                          width: 32,
                          borderRadius: 16,
                          borderWidth: 1,
                        }}
                        source={{ uri: user?.photoURL }}
                      />
                      <View style={{ marginHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              color: theme.colors.primary,
                              right: 2,
                              fontSize: 13,
                            }}
                          >
                            @{user?.username}
                          </Text>
                          <Text
                            style={{
                              color: '#cfcfcf',
                              fontSize: 11,
                              paddingLeft: 5,
                              paddingTop: 2,
                            }}
                          >
                            {moment(item.createdAt.toDate()).fromNow(true)}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: theme.colors.primary,
                            fontSize: 13,
                            paddingTop: 2,
                          }}
                        >
                          {item.reply}
                        </Text>
                        <View
                          style={{ flexDirection: 'row', paddingTop: 3 }}
                        ></View>
                      </View>
                    </View>
                    <View key={item.id} style={{ justifyContent: 'flex-end' }}>
                      <TextInput
                        style={{
                          flex: 1,
                          right: 10,
                          borderRadius: 16,
                          color: '#ffffff',
                          padding: 10,
                        }}
                        // value={reply}
                        returnKeyType="send"
                        onSubmitEditing={handleReplies}
                        onChangeText={setReply}
                        placeholder="Add a reply..."
                        placeholderTextColor={'#797979'}
                      />
                    </View>
                  </>
                )}
              />
            </>
            {/* )} */}
          </>
        )}
      </View>
    </View>
  );
}
