import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  LogBox,
  RefreshControl,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { auth } from '../../api/firebase';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchCurrentUserScrapbooks } from '../../contexts/slices/scrapbooks/currentUserScrapbooksSlice';
import ProfileDetails from '../../ui/components/Profile/ProfileDetails';
import { fetchCurrentUser } from '../../contexts/slices/users/currentUserSlice';
import Tabs from '../../ui/components/Profile/Tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Profile({ navigation }: any) {
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const currentUserScrapbooks = useAppSelector(
    (state) => state.currentUserScrapbooks.scrapbooks
  );

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.dispatch(StackActions.replace('Login'));
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
  };

  useEffect(() => {
    dispatch(fetchCurrentUser(auth.currentUser?.uid)).then(() =>
      setRefreshing(false)
    );
    dispatch(fetchCurrentUserScrapbooks(currentUser?.uid)).then(() =>
      setRefreshing(false)
    );
  }, [refreshing]);

  const scrollY = useRef(new Animated.Value(0)).current;

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
          navigation={navigation}
          me={true}
          scrollY={scrollY}
        />
        <Tabs
          user={currentUser}
          scrapbooks={currentUserScrapbooks}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          navigation={navigation}
        />
        <Button title="Logout" onPress={handleLogout} />
      </Animated.ScrollView>
    </>
  );
}
