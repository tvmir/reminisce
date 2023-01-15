import React, { useEffect, useRef, useState } from 'react';
import { Button, View, ScrollView, LogBox, RefreshControl } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { auth } from '../../api/firebase';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scale';
import { fetchCurrentUserScrapbooks } from '../../contexts/slices/scrapbooks/currentUserScrapbooksSlice';
import ProfileDetails from '../../ui/components/Profile/ProfileDetails';
import { fetchCurrentUser } from '../../contexts/slices/users/currentUserSlice';
import Tabs from '../../ui/components/Profile/Tabs';

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

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'transparent' }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
    >
      <View style={{ padding: 4 }}>
        <ProfileDetails user={currentUser} navigation={navigation} me={true} />
        <Tabs
          user={currentUser}
          scrapbooks={currentUserScrapbooks}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          navigation={navigation}
        />
      </View>

      {/* <Button title="Logout" onPress={handleLogout} /> */}
    </ScrollView>
  );
}
