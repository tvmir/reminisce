import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  LogBox,
  RefreshControl,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import ProfileDetails from '../../ui/components/Profile/ProfileDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchUser } from '../../contexts/slices/users/userSlice';
import Tabs from '../../ui/components/Profile/Tabs';
import { fetchUserScrapbooks } from '../../contexts/slices/scrapbooks/userScrapbooksSlice';

export default function UsersProfile({ route, navigation }: any) {
  const { user } = route.params;
  const dispatch = useAppDispatch();
  const otherUser = useAppSelector((state) => state.user.user);
  const userScrapbooks = useAppSelector(
    (state) => state.userScrapbooks.scrapbooks
  );
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs([
      `undefined is not an object (evaluating '_n7.indexOf')`,
    ]);
  }, []);

  useEffect(() => {
    dispatch(fetchUser(user?.uid)).then(() => setRefreshing(false));
    dispatch(fetchUserScrapbooks(user?.uid)).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
      style={{ padding: 4 }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          left: 12,
          top: 48,
          zIndex: 1,
        }}
      >
        <Ionicons name="ios-chevron-back" size={30} color="white" />
      </TouchableOpacity>
      <View style={{ padding: 4 }}>
        <ProfileDetails
          user={otherUser}
          navigation={navigation}
          me={false}
          scrollY={scrollY}
        />
        <Tabs
          user={user}
          scrapbooks={userScrapbooks}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          navigation={navigation}
        />
      </View>
    </Animated.ScrollView>
  );
}
