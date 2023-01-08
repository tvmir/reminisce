import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
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

export default function Feed({ route, navigation }: any) {
  const dispatch = useAppDispatch();
  const scrapbooks = useAppSelector((state) => state.scrapbooks.scrapbooks);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    dispatch(fetchScrapbooks()).then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  return (
    <Wrapper edges={['top', 'left', 'right']}>
      {/* <View style={}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
          Close By
        </Text>
      </View> */}
      <FlatList
        removeClippedSubviews
        pagingEnabled
        refreshing={refreshing}
        onRefresh={fetchScrapbooks}
        decelerationRate={'normal'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={scrapbooks}
        renderItem={({ item }) => (
          <>
            <SharedElement id={`${item.id}.images`}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('ExpandedFeed', { item })}
              >
                <FeedWrapper
                  style={{
                    height:
                      // 186 for iPhone 13, 182 for iPhone XS
                      Dimensions.get('window').height -
                      bottomTabBarHeight -
                      182,
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
            <View style={{ height: 80 }}>
              <FeedDetails item={item} navigation={navigation} />
            </View>
          </>
        )}
      />
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(SafeAreaView)`
  flex: 1;
  width: 92%;
  margin: 0 auto 0 auto;
  margin-top: ${verticalScale(-30)}px;
`;

const FeedWrapper = styled(View)`
  flex: 1;
  background-color: #272727;
`;
