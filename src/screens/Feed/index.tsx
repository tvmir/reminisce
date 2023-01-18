import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  LogBox,
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
import { useScrollToTop } from '@react-navigation/native';

interface FeedProps {
  navigation: any;
}

export default function Feed({ navigation }: any) {
  const dispatch = useAppDispatch();
  const scrapbook = useAppSelector((state) => state.scrapbooks.scrapbooks);
  const [scrapbooks, setScrapbooks] = useState<any>();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const ref = React.useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    dispatch(fetchScrapbooks())
      .then(() => setScrapbooks(scrapbook?.map((item: DocumentData) => item)))
      .then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <Wrapper edges={['top', 'left', 'right']}>
      <FlatList
        ref={ref}
        removeClippedSubviews
        pagingEnabled
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        decelerationRate={'normal'}
        keyExtractor={(item) => item.id}
        data={scrapbooks}
        renderItem={({ item, index }) => {
          // const bg = index % 2 === 0 ? '#c06262' : '#3d8c96';
          return (
            <View style={{ flex: 1 }}>
              <SharedElement id={`${item.id}.images`}>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('ExpandedFeed', { item })}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#272727',
                      height:
                        // 1.719 for iPhone XS
                        // 1.69 for iPhone 13 Pro
                        Dimensions.get('window').height / 1.69 +
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
                  </View>
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
