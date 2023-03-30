import React, { useEffect, useRef, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  LogBox,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchScrapbooks } from '../../contexts/slices/scrapbooks/scrapbooksSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useScrollToTop } from '@react-navigation/native';
import { fetchFollowingScrapbooks } from '../../contexts/services/scrapbook';
import { SceneMap, TabView } from 'react-native-tab-view';
import MainFeed from '../../ui/components/Feed/MainFeed';
import { BottomTabParamList } from '../../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';

interface FeedProps {
  navigation: StackNavigationProp<BottomTabParamList, 'Feed'>;
}

export default function Feed({ navigation }: FeedProps) {
  const dispatch = useAppDispatch();
  const scrapbook = useAppSelector((state) => state.scrapbooks.scrapbooks);
  const [forYouScrapbooks, setForYouScrapbooks] = useState<
    DocumentData[] | undefined
  >([]);
  const [followingScrapbooks, setFollowingScrapbooks] = useState<
    DocumentData[] | undefined
  >();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const [index, setIndex] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const forYouRef = useRef<FlatList>(null);
  const followingRef = useRef<FlatList>(null);
  useScrollToTop(forYouRef);
  useScrollToTop(followingRef);

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  useEffect(() => {
    dispatch(fetchScrapbooks())
      .then(() => setForYouScrapbooks(scrapbook))
      .then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    fetchFollowingScrapbooks().then((res) => {
      setFollowingScrapbooks(res);
      setRefreshing(false);
    });
  }, [refreshing]);

  // Component for showcasing recommended scrapbooks
  const ForYou = () => (
    <FlatList
      ref={forYouRef}
      removeClippedSubviews
      pagingEnabled
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={() => setRefreshing(true)}
      decelerationRate={'normal'}
      keyExtractor={(item) => item.id}
      data={forYouScrapbooks}
      renderItem={({ item }) => {
        // @ts-ignore
        return <MainFeed item={item} navigation={navigation} />;
      }}
    />
  );

  // Component for showcasing scrapbooks from users you follow
  const Following = () => (
    <FlatList
      ref={followingRef}
      removeClippedSubviews
      pagingEnabled
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={() => setRefreshing(true)}
      decelerationRate={'normal'}
      keyExtractor={(item) => item.id}
      data={followingScrapbooks}
      testID="following"
      renderItem={({ item }) => {
        // @ts-ignore
        return <MainFeed item={item} navigation={navigation} />;
      }}
    />
  );

  // Component for showcasing an empty following feed
  const EmptyFollowing = () => (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '400',
            marginTop: 30,
            textAlign: 'center',
          }}
        >
          Start following others to see the memories they've made!
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={{
            backgroundColor: '#EDEDED',
            width: 200,
            height: 50,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ color: '#101010', fontSize: 18, fontWeight: '600' }}>
            Explore
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderScene = SceneMap({
    following: Following
      ? followingScrapbooks?.length === 0
        ? EmptyFollowing
        : Following
      : Following,
    forYou: ForYou,
  });

  const [routes] = useState([
    { key: 'forYou', title: 'For You' },
    { key: 'following', title: 'Following' },
  ]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '93%',
        marginTop: 0,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
      }}
      edges={['top', 'left', 'right']}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <View style={{ flexDirection: 'row' }}>
            {props.navigationState.routes.map((route, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    props.jumpTo(route.key);
                  }}
                  style={styles.tabItem}
                  testID={route.title}
                >
                  <Text
                    style={[
                      styles.tabTitle,
                      props.navigationState.index === i
                        ? { color: '#fff' }
                        : { color: '#5a5a5a' },
                    ]}
                  >
                    {route.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      />
      <TouchableOpacity
        // @ts-ignore
        onPress={() => navigation.openDrawer()}
        style={{
          backgroundColor: '#272727',
          position: 'absolute',
          top: 50,
          left: 5,
          overflow: 'hidden',
          width: 30,
          height: 30,
          borderRadius: 15,
        }}
        testID="open-drawer"
      >
        <Image
          source={
            currentUser?.photoURL ? { uri: currentUser?.photoURL } : undefined
          }
          style={{ width: 30, height: 30, borderRadius: 15 }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabText: {
    color: 'gray',
  },
  activeTabText: {
    color: '#fff',
  },
  sLine: {
    position: 'absolute',
    top: 20,
    width: 77,
    height: 1,
    backgroundColor: '#0FEFFD',
  },
  aLine: {
    position: 'absolute',
    top: 20,
    width: 40,
    height: 1,
    backgroundColor: '#0FEFFD',
  },
  tabItem: {
    width: 120,
    alignItems: 'center',
    paddingLeft: 40,
    paddingVertical: 10,
    paddingBottom: 13,
    letterSpacing: 0.8,
    marginLeft: 50,
    marginRight: -75,
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});
