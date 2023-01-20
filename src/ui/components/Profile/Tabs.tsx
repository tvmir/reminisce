import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import ProfileCardDetails from './ProfileCardDetails';
import moment from 'moment';
import { TabView, SceneMap } from 'react-native-tab-view';

export default function Tabs({ user, scrapbooks, navigation }: any) {
  // const [tabIndex, setTabIndex] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const { width, height } = useWindowDimensions();

  const ProfileCards = () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {scrapbooks.map((item: any, index: number) => (
        <ProfileCardDetails
          key={index}
          item={item}
          navigation={navigation}
          index={index}
        />
      ))}
    </View>
  );

  const About = () => (
    <>
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
      <Text style={{ color: 'white' }}>{user?.bio}</Text>
      <Text style={{ color: 'white' }}>{user?.location}</Text>
    </>
  );

  const renderScene = SceneMap({
    scrapbooks: ProfileCards,
    about: About,
  });

  const [routes] = useState([
    { key: 'scrapbooks', title: 'Scrapbooks' },
    { key: 'about', title: 'About' },
  ]);

  return (
    <>
      <ScrollView
        style={{
          bottom: 30,
          flex: 1,
        }}
        contentContainerStyle={{
          position: 'relative',
          top: 0,
        }}
      >
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: width }}
          style={{ height: height - 128 }}
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
      </ScrollView>
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
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabTitle: {
    fontSize: 16,
  },
});
