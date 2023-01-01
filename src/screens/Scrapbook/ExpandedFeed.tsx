import React, { useState } from 'react';
import { View, Text, FlatList, Image, useWindowDimensions } from 'react-native';
import { useAppSelector } from '../../utils/hooks';
// @ts-ignore
import Img1 from '../../../assets/imgt1.jpeg';
// @ts-ignore
import Img2 from '../../../assets/imgt2.jpeg';
// @ts-ignore
import Img3 from '../../../assets/imgt3.jpeg';
// @ts-ignore
import Img4 from '../../../assets/imgt4.jpeg';

export default function ExpandedFeed() {
  const scrapbooks = useAppSelector((state) => state.scrapbooks.scrapbooks);
  const { width } = useWindowDimensions();

  const IMG1 = Image.resolveAssetSource(Img1).uri;
  const IMG2 = Image.resolveAssetSource(Img2).uri;
  const IMG3 = Image.resolveAssetSource(Img3).uri;
  const IMG4 = Image.resolveAssetSource(Img4).uri;

  const [images, setimages] = useState([IMG1, IMG2, IMG3, IMG4]);
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width: width, height: 250 }} />
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={{ marginVertical: 40, paddingBottom: 100 }}
      />
    </>
  );
}
