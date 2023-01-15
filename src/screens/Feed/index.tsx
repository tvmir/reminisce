import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import styled from 'styled-components/native';
import { fetchScrapbooks } from '../../contexts/slices/scrapbooks/scrapbooksSlice';
import FeedDetails from '../../ui/components/Feed/FeedDetails';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { verticalScale } from '../../utils/scale';

interface FeedProps {
  route: RouteProp<{ params: { setUserInView: any } }, 'params'>;
  navigation: any;
}

export default function Feed({ navigation }: any) {
  const dispatch = useAppDispatch();
  const scrapbooks = useAppSelector((state) => state.scrapbooks.scrapbooks);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [refreshing, setRefreshing] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchScrapbooks()).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <Wrapper edges={['top', 'left', 'right']}>
      <FlatList
        removeClippedSubviews
        pagingEnabled
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        decelerationRate={'normal'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={scrapbooks}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1 }}>
              <SharedElement id={`${item.id}.images`}>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('ExpandedFeed', { item })}
                >
                  <FeedWrapper
                    style={{
                      height:
                        Dimensions.get('window').height / 1.719 +
                        bottomTabBarHeight,
                      borderRadius: 20,
                    }}
                  >
                    <Image
                      style={{ flex: 1, borderRadius: 20 }}
                      source={{
                        uri: item.images[0],
                      }}
                    />
                  </FeedWrapper>
                </TouchableWithoutFeedback>
              </SharedElement>
              <FeedDetails item={item} navigation={navigation} />
            </View>
          );
        }}
      />
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(SafeAreaView)`
  flex: 1;
  width: 93%;
  margin: 0 auto 0 auto;
  margin-top: ${verticalScale(-30)}px;
`;

const FeedWrapper = styled(View)`
  flex: 1;
  background-color: #272727;
`;
