import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  LogBox,
  RefreshControl,
  Animated,
} from 'react-native';
import ProfileDetails from '../../ui/components/Profile/ProfileDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchUser } from '../../contexts/slices/users/userSlice';
import Tabs from '../../ui/components/Profile/Tabs';
import { fetchUserScrapbooks } from '../../contexts/slices/scrapbooks/userScrapbooksSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList, RootStackParamList } from '../../utils/types';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';

interface UsersProfileProps {
  route: RouteProp<{ params: { user: DocumentData } }, 'params'>;
  navigation: NativeStackScreenProps<BottomTabParamList>;
}

export default function UsersProfile({ route }: UsersProfileProps) {
  const { user } = route.params;
  const dispatch = useAppDispatch();
  const otherUser = useAppSelector((state) => state.user.user);
  const userScrapbooks = useAppSelector(
    (state) => state.userScrapbooks.scrapbooks
  );
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

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
        <ProfileDetails user={otherUser} me={false} scrollY={scrollY} />
        <Tabs
          user={user}
          scrapbooks={userScrapbooks}
          navigation={navigation as any}
        />
      </Animated.ScrollView>
    </>
  );
}
