import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { fetchScrapbooks } from '../../contexts/slices/scrapbooks/scrapbooksSlice';
import ScrollFeed from '../../ui/components/ScrollFeed';
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
  const [isOpen, setIsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchScrapbooks()).then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  return (
    <Wrapper edges={['top', 'left', 'right']}>
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
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('ExpandedFeed')}
            >
              <FeedWrapper
                style={{
                  height:
                    // 186 for iPhone 13, 182 for iPhone XS
                    Dimensions.get('window').height - bottomTabBarHeight - 182,
                  borderRadius: 20,
                }}
              >
                <Image
                  style={{ flex: 1, borderRadius: 20 }}
                  resizeMode="cover"
                  source={{
                    uri: item.images[0],
                  }}
                />
              </FeedWrapper>
            </TouchableWithoutFeedback>
            <View style={{ height: 80 }}>
              <ScrollFeed item={item} navigation={navigation} />
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
  width: 95%;
  margin: 0 auto 0 auto;
  margin-top: ${verticalScale(-30)}px;
`;

const FeedWrapper = styled(View)`
  flex: 1;
  background-color: #272727;
`;
