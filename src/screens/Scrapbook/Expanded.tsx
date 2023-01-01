import React from 'react';
import { View, Text, FlatList, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';

export default function Expanded({ route }: any) {
  const { item } = route.params;
  console.log(item);

  const { width } = useWindowDimensions();
  return (
    <SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={item.images}
        renderItem={({ item }) => (
          <SharedElement id={item.id}>
            <Image
              source={{ uri: item }}
              style={{ width: width, height: 250 }}
            />
          </SharedElement>
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={{ marginVertical: 40, paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
}
