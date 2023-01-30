import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { BottomTabParamList, RootStackParamList } from '../../utils/types';
import Feather from 'react-native-vector-icons/Feather';
import ScrapbookMasonry from '../../ui/components/Search/ScrapbookMasonry';
import { fetchScrapbooks } from '../../contexts/slices/scrapbooks/scrapbooksSlice';
import { fetchScrapbooksSearch } from '../../contexts/slices/scrapbooks/searchScrapbooksSlice';
import ScrapbookSearchCard from '../../ui/components/Search/ScrapbookSearchCard';
import SearchUsers from './Users';
import { StackNavigationProp } from '@react-navigation/stack';

// constants
export const SPACING = 24;

interface SearchProps {
  navigation: StackNavigationProp<BottomTabParamList, 'Search'>;
}

export default function Search({ navigation }: SearchProps) {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const scrapbooks = useAppSelector((state) => state.scrapbooks.scrapbooks);
  const scrapbooksSearch = useAppSelector(
    (state) => state.scrapbooksSearch.scrapbooks
  );

  useEffect(() => {
    dispatch(fetchScrapbooks()).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    if (input !== search) {
      setSearch(input);
      dispatch(fetchScrapbooksSearch(input));
    }
  }, [input]);

  const tabBar = [
    {
      name: 'Scrapbooks',
      component: () => (
        // @ts-ignore
        <ScrapbookMasonry scrapbooks={scrapbooks} navigation={navigation} />
      ),
    },
    {
      name: 'People',
      // @ts-ignore
      component: () => <SearchUsers navigation={navigation} />,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {input.length > 0 ? (
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
                clearButtonMode="always"
              />
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
              <ScrapbookSearchCard item={item} navigation={navigation as any} />
            )}
            style={{ marginLeft: 25 }}
          />
        </View>
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
