import React, { useEffect, useRef, useState } from 'react';
import {
  LogBox,
  RefreshControl,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { auth } from '../../api/firebase';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchCurrentUserScrapbooks } from '../../contexts/slices/scrapbooks/currentUserScrapbooksSlice';
import ProfileDetails from '../../ui/components/Profile/ProfileDetails';
import { fetchCurrentUser } from '../../contexts/slices/users/currentUserSlice';
import Tabs from '../../ui/components/Profile/Tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';

interface ProfileProps {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
}

export default function Profile({ navigation }: ProfileProps) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const currentUserScrapbooks = useAppSelector(
    (state) => state.currentUserScrapbooks.scrapbooks
  );
  const [refreshing, setRefreshing] = useState<boolean>(true);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    dispatch(fetchCurrentUser(auth.currentUser?.uid)).then(() =>
      setRefreshing(false)
    );
  }, [refreshing]);

  useEffect(() => {
    dispatch(fetchCurrentUserScrapbooks(currentUser?.uid)).then(() =>
      setRefreshing(false)
    );
  }, [refreshing]);

  return (
    <>
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
        <ProfileDetails
          user={currentUser}
          me={true}
          scrollY={scrollY}
          navigation={navigation}
        />
        <Tabs
          user={currentUser}
          scrapbooks={currentUserScrapbooks}
          navigation={navigation}
        />
      </Animated.ScrollView>
    </>
  );
}
