import React from 'react';
import { create } from 'react-test-renderer';
import Feed from '.';
import FeedDetails from '../../ui/components/Feed/FeedDetails';
import MainFeed from '../../ui/components/Feed/MainFeed';

describe('Feed screen functionalities', () => {
  it('should open the left drawer', () => {
    const navigation = {
      openDrawer: jest.fn(),
    };
    // @ts-ignore
    const screen = create(<Feed />);
    const openDrawer = screen.root.findByProps({ testID: 'open-drawer' });
    openDrawer.props.onPress();
    expect(navigation.openDrawer).toHaveBeenCalled();
  });

  it('should go to the following scrapbooks tab', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const screen = create(<Feed />);
    const openFollowing = screen.root.findByProps({ testID: 'following' });

    openFollowing.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith('Following');
  });

  it('should open a scrapbook', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const screen = create(<MainFeed />);
    const expandScrapbook = screen.root.findByProps({
      testID: 'expand-scrapbook',
    });

    expandScrapbook.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith('Scrapbook');
  });

  it('should like a scrapbook', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const screen = create(<FeedDetails />);
    const likeScrapbook = screen.root.findByProps({ testID: 'like-btn' });

    likeScrapbook.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith('Like');
  });
});
