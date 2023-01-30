import React from 'react';
import { DocumentData } from 'firebase/firestore';
import { View, Text } from 'react-native';

interface ScrapbookDetailsProps {
  item: DocumentData | undefined;
}

export default function ScrapbookDetails({ item }: ScrapbookDetailsProps) {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        paddingBottom: 8,
        paddingTop: 18,
      }}
    >
      <Text style={[{ fontSize: 32, fontWeight: 'bold', color: '#fff' }]}>
        {item?.name}
      </Text>

      <Text style={[{ fontSize: 10, color: '#cdcdcd' }]}>
        {item?.location.name || ''}
      </Text>
      <Text style={[{ fontSize: 14, color: '#ffffff', paddingTop: 10 }]}>
        {item?.description}
      </Text>
      <Text style={[{ fontSize: 12, color: '#949494', paddingTop: 10 }]}>
        {item?.tags
          .map((tag: string) => `#${tag}`)
          .join(' ')
          .replace(/# /g, '#') || ''}
      </Text>
    </View>
  );
}
