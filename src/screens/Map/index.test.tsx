import React from 'react';
import { ScrollView, View } from 'react-native';
import { create } from 'react-test-renderer';
import Map from '.';
import MapCard from '../../ui/components/Map/MapCard';

describe('Map screen functionalities', () => {
  it('should open a scrapbook from the bottom carousel', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const screen = create(<MapCard />);
    const openScrapbook = screen.root.findByProps({ testID: 'open-scrapbook' });

    openScrapbook.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith('Scrapbook');
  });

  it('should navigate to the AR screen', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const screen = create(<Map />);
    const openAR = screen.root.findByProps({ testID: 'ar-350' });

    openAR.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith('CameraView');
  });

  it('should scroll to the next closest scrapbook', () => {
    const scrapbooks = ['Rain', 'Autumn', 'Cars'];
    const scrollView = create(
      <ScrollView horizontal>
        {scrapbooks.map((scrapbook) => (
          <View key={scrapbook} />
        ))}
      </ScrollView>
    );

    const current = scrollView.root;
    const scroll = current.findByType(ScrollView);
    expect(scroll.props.horizontal).toBe(true);

    // Initially at 0
    expect(scroll.props.contentOffset.x).toBe(0);

    // Simulate scrolling to the next scrapbook
    scroll.props.onScroll({
      nativeEvent: { contentOffset: { x: 100 } },
    });
    expect(scroll.props.contentOffset.x).toBe(100);
  });
});
