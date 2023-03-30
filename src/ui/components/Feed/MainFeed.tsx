import React from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import FeedDetails from './FeedDetails';
import { DocumentData } from 'firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../utils/types';

interface MainFeedProps {
  item: DocumentData | undefined;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export default function MainFeed({ item, navigation }: MainFeedProps) {
  const bottomTabBarHeight = useBottomTabBarHeight();
  return (
    <View style={{ flex: 1 }}>
      <SharedElement id={`${item?.id}.images`}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Scrapbook', { item })}
          testID="expand-scrapbook"
        >
          <View
            style={{
              flex: 1,
              backgroundColor: '#272727',
              height:
                Dimensions.get('window').height / 1.665 + bottomTabBarHeight,
              borderRadius: 16,
            }}
          >
            <Image
              style={{ flex: 1, borderRadius: 16 }}
              source={{ uri: item?.images[0] }}
            />
          </View>
        </TouchableWithoutFeedback>
      </SharedElement>
      <FeedDetails item={item} navigation={navigation} />
    </View>
  );
}
