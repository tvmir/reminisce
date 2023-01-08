import { createRef, forwardRef } from 'react';
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';

const sections = {
  scrapbooks: 'scrapbooks',
  about: 'about',
};

export const data = Object.keys(sections).map((i) => ({
  key: i,
  name: i,
  ref: createRef(),
}));

export default function TabIndicator({ data, scrollX, onItemPress }: any) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width: width / 2, paddingTop: 10 }}>
      <View
        style={{
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}
      >
        {data.map((item: any, index: any) => (
          <Tab
            item={item}
            key={item.key}
            ref={item.ref}
            onItemPress={() => onItemPress(index)}
          />
        ))}
      </View>
      <Indicator data={data} scrollX={scrollX} />
    </View>
  );
}

const Tab = forwardRef(({ item, onItemPress }: any, ref): any => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      {/* @ts-ignore */}
      <View ref={ref}>
        <Text style={{ color: '#ededed', fontWeight: '400' }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({ data, scrollX }: any) => {
  const { width } = useWindowDimensions();
  const inputRange = data.map((_: any, i: any) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: data.map((item: any) => {
      if (item.key === 'scrapbooks') {
        return 75;
      } else {
        return 50;
      }
    }),
  });
  return (
    <Animated.View
      style={{
        height: 2,
        width: indicatorWidth,
        // left: 24,
        backgroundColor: '#0FEFFD',
        bottom: -6,
        transform: [
          {
            translateX: scrollX.interpolate({
              inputRange,
              outputRange: data.map((item: any) => {
                if (item.key === 'scrapbooks') {
                  return 24;
                } else {
                  return 14;
                }
              }),
            }),
          },
        ],
      }}
    />
  );
};
