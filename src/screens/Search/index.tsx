import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scale';
import { RootStackParamList } from '../../utils/types';
import Feather from 'react-native-vector-icons/Feather';
import ScrapbookMasonry from '../../ui/components/Search/ScrapbookMasonry';
import { fetchScrapbooks } from '../../contexts/slices/scrapbooks/scrapbooksSlice';
import { fetchScrapbooksSearch } from '../../contexts/slices/scrapbooks/searchScrapbooksSlice';
import ScrapbookSearchCard from '../../ui/components/Search/ScrapbookSearchCard';
// import Animated from 'react-native-reanimated';
import { AntDesign, Entypo } from '@expo/vector-icons';
import SearchUsers from './Users';

interface SearchProps {
  route: any;
  navigation: any;
}

// constants
export const SPACING = 24;

export default function Search({ navigation }: SearchProps) {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const scrapbooks = useAppSelector((state) => state.scrapbooks.scrapbooks);
  const scrapbooksSearch = useAppSelector(
    (state) => state.scrapbooksSearch.scrapbooks
  );
  const animated = useRef(new Animated.Value(0)).current;
  let open: any;

  const clearInput = useCallback(() => setInput(''), []);

  useEffect(() => {
    if (input !== search) {
      setSearch(input);
      dispatch(fetchScrapbooksSearch(input));
    }
  }, [input]);

  useEffect(() => {
    dispatch(fetchScrapbooks()).then(() => setRefreshing(false));
  }, [refreshing]);

  const [tabIndex, setTabIndex] = useState<number>(0);

  const tabBar = [
    {
      name: 'Scrapbooks',
      component: () => (
        <ScrapbookMasonry scrapbooks={scrapbooks} navigation={navigation} />
      ),
    },
    {
      name: 'People',
      component: () => <SearchUsers navigation={navigation} />,
    },
  ];

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.spring(animated, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    open = !open;
    return open;
  };

  const rotation = {
    transform: [
      {
        rotate: animated.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  const pinStyle = {
    transform: [
      { scale: animated },
      {
        translateY: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {input.length > 0 ? (
        <>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: SPACING,
              paddingBottom: SPACING / 1.5,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{ position: 'absolute', top: 11, left: 11, zIndex: 1 }}
                pointerEvents="none"
              >
                <Feather name="search" size={20} color="#fff" />
              </View>

              <TextInput
                style={{
                  backgroundColor: '#1c1b1b',
                  color: '#ededed',
                  paddingLeft: 40,
                  borderRadius: 18,
                  height: 42,
                  flex: 1,
                  borderColor: '#1f1e1e',
                }}
                placeholder="Search"
                value={input}
                onChangeText={(text) => setInput(text)}
                clearButtonMode="always"
              />
              <TouchableOpacity
                onPress={clearInput}
                style={{ paddingVertical: 15, paddingHorizontal: 5 }}
              >
                <Text style={{ color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            numColumns={3}
            horizontal={false}
            data={scrapbooksSearch}
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ScrapbookSearchCard item={item} navigation={navigation} />
            )}
            style={{ marginLeft: 25 }}
          />
        </>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: SPACING,
              paddingBottom: SPACING / 1.5,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{ position: 'absolute', top: 11, left: 11, zIndex: 1 }}
                pointerEvents="none"
              >
                <Feather name="search" size={20} color="#fff" />
              </View>

              <TextInput
                style={{
                  backgroundColor: '#1c1b1b',
                  color: '#ededed',
                  paddingLeft: 40,
                  borderRadius: 18,
                  height: 42,
                  flex: 1,
                  borderColor: '#1f1e1e',
                }}
                placeholder="Search"
                value={input}
                onChangeText={(text) => setInput(text)}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            {tabBar.map((tab, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setTabIndex(index)}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 8,
                  backgroundColor: index === tabIndex ? '#d4d4d4' : '#1f1e1e',
                  borderRadius: 18,
                  marginBottom: 10,
                  width: tab.name === 'Scrapbooks' ? 80 : 50,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: '#1f1e1e',
                }}
              >
                <Text
                  style={{
                    color: index === tabIndex ? '#000000' : '#ededed',
                    fontSize: 10,
                    fontWeight: '500',
                  }}
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {tabBar[tabIndex].component()}
        </View>
      )}
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F02A4B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    // shadowOffset: { height: 10 },
  },
  menu: {
    backgroundColor: '#FD0FDD',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3d7d9',
    position: 'absolute',
    bottom: 10,
    right: 27,
    alignItems: 'center',
  },
});
