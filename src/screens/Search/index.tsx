import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
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

  return (
    <Wrapper edges={['top', 'left', 'right']}>
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
              />
            </View>
          </View>
          <ScrapbookMasonry scrapbooks={scrapbooks} navigation={navigation} />
        </>
      )}
    </Wrapper>
  );
}

// Styles
const Wrapper = styled(SafeAreaView)`
  flex: 1;
`;
