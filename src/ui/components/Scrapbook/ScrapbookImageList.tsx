import React from 'react';
import {
  Dimensions,
  FlatList,
  LayoutRectangle,
  View,
  Animated,
} from 'react-native';
import FitImage from 'react-native-fit-image';
// import Animated from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import styled from 'styled-components/native';
import ScrapbookDetails from '../Modal/Scrapbook/ScrapbookDetails';

// constants
const { height } = Dimensions.get('window');
// const MAX_HEIGHT = height / 1.2;

export default function ScrapbookImageList({ images, id, item }: any) {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [bottomActions, setBottomActions] = React.useState<LayoutRectangle>(
    null as any
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ height: (images.length + 1) * height }}
        // ListFooterComponent={() => (
        //   <>
        //     <View
        //       onLayout={(ev) => {
        //         setBottomActions(ev.nativeEvent.layout);
        //       }}
        //       style={{ height: 120, backgroundColor: 'red' }}
        //     >
        //       {bottomActions && (
        //         <ScrapbookDetails
        //           item={item}
        //           scrollY={scrollY}
        //           topEdge={topEdge}
        //         />
        //       )}
        //     </View>
        //   </>
        // )}
        data={images}
        renderItem={({ item, index }) => (
          <>
            {!index ? (
              <Wrapper>
                <SharedElement id={`${id}.images`}>
                  {/* @ts-ignore */}
                  <FitImage source={{ uri: item }} />
                </SharedElement>
              </Wrapper>
            ) : (
              <>
                <Wrapper>
                  {/* @ts-ignore */}
                  <FitImage source={{ uri: item }} />
                </Wrapper>
              </>
            )}
          </>
        )}
      />
      {<ScrapbookDetails item={item} scrollY={scrollY} />}
    </View>
  );
}

// Styles
const Wrapper = styled(View)`
  width: 98%;
  margin: 0 auto 0 auto;
  padding-bottom: 10px;
`;
