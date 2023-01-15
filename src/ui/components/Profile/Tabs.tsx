import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ProfileCardDetails from './ProfileCardDetails';
import moment from 'moment';

export default function Tabs({
  user,
  scrapbooks,
  refreshing,
  setRefreshing,
  navigation,
}: any) {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const tabBar = [
    {
      title: 'Scrapbooks',
      component: () => (
        <View key={'scrapbooks'}>
          <FlatList
            numColumns={2}
            initialNumToRender={4}
            removeClippedSubviews
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
            data={scrapbooks}
            renderItem={({ item }) => (
              <ProfileCardDetails item={item} navigation={navigation} />
            )}
          />
        </View>
      ),
    },
    {
      title: 'About',
      component: () => (
        <View key={'about'}>
          <Text
            style={{
              position: 'absolute',
              top: 215,
              left: 0,
              right: 0,
              textAlign: 'center',
              color: '#5a5a5a',
              fontSize: 12,
            }}
          >
            Joined {moment(user?.createdAt).format('MMM Do YYYY')}
          </Text>
          <Text style={{ color: 'white' }}>
            {user?.bio ? user?.bio : 'No bio'}
          </Text>
        </View>
      ),
    },
  ];

  return (
    <>
      <View
        style={{
          bottom: 20,
          alignItems: 'flex-start',
        }}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}
          >
            {tabBar.map((tab, i) => {
              const active = tabIndex === i;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => setTabIndex(i)}
                  style={{ marginRight: 20 }}
                >
                  {active && tab.title === 'Scrapbooks' && (
                    <View style={styles.sLine} />
                  )}
                  {active && tab.title === 'About' && (
                    <View style={styles.aLine} />
                  )}
                  <Text style={active ? styles.activeTabText : styles.tabText}>
                    {tab.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
      {tabBar[tabIndex].component()}
    </>
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
});
