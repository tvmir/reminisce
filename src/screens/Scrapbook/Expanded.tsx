import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');
const dimensions = Dimensions.get('window');
const width = dimensions.width;

export default function Expanded({ route, navigation }: any) {
  const { item } = route.params;
  // console.log(item);

  return (
    <View>
      <SharedElement
        id={`${item.id}.images`}
        style={{
          height: height,
          width: width,
        }}
      >
        <Image
          source={{ uri: item.images[0] }}
          style={{
            height: height / 2,
            width: width,
          }}
        />
      </SharedElement>

      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
          position: 'absolute',
          top: 50,
          right: 20,
          opacity: 0.9,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close-circle" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}
