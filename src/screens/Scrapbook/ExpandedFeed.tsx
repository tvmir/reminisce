import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useAppSelector } from '../../utils/hooks';
// @ts-ignore
import Img1 from '../../../assets/imgt1.jpeg';
// @ts-ignore
import Img2 from '../../../assets/imgt2.jpeg';
// @ts-ignore
import Img3 from '../../../assets/imgt3.jpeg';
// @ts-ignore
import Img4 from '../../../assets/imgt4.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { DraggableGrid } from 'react-native-draggable-grid';

export default function ExpandedFeed({ navigation }: any) {
  const { width } = useWindowDimensions();

  const IMG1 = Image.resolveAssetSource(Img1).uri;
  const IMG2 = Image.resolveAssetSource(Img2).uri;
  const IMG3 = Image.resolveAssetSource(Img3).uri;
  const IMG4 = Image.resolveAssetSource(Img4).uri;

  const [data, setData] = useState([
    { key: 1, image: IMG1 },
    { key: 2, image: IMG2 },
    { key: 3, image: IMG3 },
    { key: 4, image: IMG4 },
    { key: 5, image: IMG1 },
    { key: 6, image: IMG2 },
    { key: 7, image: IMG3 },
    { key: 8, image: IMG4 },
    { key: 9, image: IMG2 },
  ]);

  const [images, setImages] = useState([IMG1, IMG2, IMG3, IMG4]);

  const renderItem = (item: { image: string; key: number }) => {
    return (
      <View style={styles.item} key={item.key}>
        <Image
          style={{ width: 150, height: 150, padding: 20 }}
          source={{ uri: item.image }}
        />
      </View>
    );
  };

  // return (
  //   <View style={styles.wrapper}>
  //     <ScrollView showsVerticalScrollIndicator={false} style={{}}>
  //       <DraggableGrid
  //         numColumns={2}
  //         renderItem={renderItem}
  //         data={data}
  //         onDragRelease={(data) => setData(data)}
  //       />
  //     </ScrollView>
  //   </View>
  // );

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={images}
        renderItem={({ item, drag, isActive }) => (
          <View style={{ padding: 15 }}>
            <TouchableOpacity
              onLongPress={drag}
              disabled={isActive}
              activeOpacity={0.8}
            >
              <Image
                style={{ width: 150, height: 200 }}
                source={{ uri: item }}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item}
        onDragEnd={({ data }) => setImages(data)}
        contentContainerStyle={{ marginVertical: 40, paddingBottom: 100 }}
      />
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
        <Ionicons name="close-circle" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 100,
  },
  item: {
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_text: {
    fontSize: 40,
    color: '#FFFFFF',
  },
});
