import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { fetchScrapbooks } from '../../contexts/slices/scrapbooks/scrapbooksSlice';
import ScrollFeed from '../../ui/components/ScrollFeed';
import {
  useAppDispatch,
  useAppSelector,
  useUserQuery,
} from '../../utils/hooks';
import { Motion } from '@legendapp/motion';

interface FeedProps {
  route: RouteProp<{ params: { setUserInView: any } }, 'params'>;
  navigation: any;
}

export default function Feed({ route, navigation }: any) {
  const dispatch = useAppDispatch();
  const scrapbooks = useAppSelector((state) => state.scrapbooks.scrapbooks);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchScrapbooks());
  }, []);

  return (
    <Wrapper edges={['top', 'left', 'right']}>
      <FlatList
        removeClippedSubviews
        pagingEnabled
        decelerationRate={'normal'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={scrapbooks}
        renderItem={({ item }) => (
          <>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Expanded')}
            >
              <FeedWrapper
                style={{
                  height:
                    // 186 for iPhone 13, 180 with header
                    Dimensions.get('window').height - bottomTabBarHeight - 181,
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
  margin-top: -30px;
`;

const FeedWrapper = styled(View)`
  flex: 1;
  background-color: #272727;
`;
