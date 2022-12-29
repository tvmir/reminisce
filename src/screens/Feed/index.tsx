import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { fetchFeedScrapbooks } from '../../contexts/slices/scrapbooks/feedSlice';
import ScrollFeed from '../../ui/components/ScrollFeed';
import {
  useAppDispatch,
  useAppSelector,
  useUserQuery,
} from '../../utils/hooks';

interface FeedProps {
  route: RouteProp<{ params: { setUserInView: any } }, 'params'>;
  navigation: any;
}

export default function Feed({ route, navigation }: any) {
  const dispatch = useAppDispatch();
  const feedScrapbooks = useAppSelector(
    (state) => state.feedScrapbooks.feedScrapbooks
  );
  const bottomTabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    dispatch(fetchFeedScrapbooks());
  }, []);

  return (
    <Wrapper>
      <FlatList
        removeClippedSubviews
        pagingEnabled
        decelerationRate={'normal'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 90,
        }}
        keyExtractor={(item) => item.id}
        data={feedScrapbooks}
        renderItem={({ item }) => (
          <FeedWrapper
            style={{
              height:
                Dimensions.get('window').height - bottomTabBarHeight - 166,
            }}
          >
            <ScrollFeed item={item} navigation={navigation} />
          </FeedWrapper>
        )}
      />
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(SafeAreaView)`
  flex: 1;
`;

const FeedWrapper = styled(View)`
  flex: 1;
  background-color: #434343;
`;
