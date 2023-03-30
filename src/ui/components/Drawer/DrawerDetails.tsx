import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../../../utils/hooks';
import { StackActions } from '@react-navigation/native';
import { auth } from '../../../api/firebase';

export default function DrawerDetails(props: any) {
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  // Used to sign out of the app
  const signout = (): void => {
    auth
      .signOut()
      .then(() => {
        props.navigation.dispatch(StackActions.replace('Login'));
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView scrollEnabled={false} {...props}>
        <View style={{ flex: 1 }}>
          <View style={{}}>
            <View
              style={{
                marginTop: 15,
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Profile');
                }}
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 60,
                  borderWidth: 1,
                  backgroundColor: '#272727',
                }}
              >
                <Image
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 60,
                    borderWidth: 1,
                  }}
                  source={
                    currentUser?.photoURL
                      ? { uri: currentUser?.photoURL }
                      : undefined
                  }
                />
              </TouchableOpacity>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 3,
                    fontWeight: '500',
                    color: '#ededed',
                  }}
                >
                  {currentUser?.name}
                </Text>
                <Text style={{ color: '#808080', textAlign: 'center' }}>
                  @{currentUser?.username}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 70,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 15,
                }}
              >
                <Text
                  style={{
                    lineHeight: 14,
                    color: '#ededed',
                    fontWeight: '500',
                    marginRight: 3,
                  }}
                >
                  {currentUser?.followers_count}
                </Text>
                <Text style={{ color: '#808080', lineHeight: 14 }}>
                  Followers
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 15,
                }}
              >
                <Text
                  style={{
                    lineHeight: 14,
                    color: '#ededed',
                    fontWeight: '500',
                    marginRight: 3,
                  }}
                >
                  {currentUser?.following_count}
                </Text>
                <Text style={{ color: '#808080', lineHeight: 14 }}>
                  Following
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  color={'#ededed'}
                  size={28}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: '#ededed' }}>Profile</Text>
              )}
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="settings-outline" color={'#fff'} size={26} />
              )}
              label={({ color }) => (
                <Text style={{ color: '#ededed' }}>Settings</Text>
              )}
              onPress={() => {}}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        }}
      >
        <DrawerItem
          style={{ marginBottom: 35 }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={'#ededed'}
              size={28}
            />
          )}
          label={({ color }) => <Text style={{ color: '#fff' }}>Sign Out</Text>}
          onPress={() => {
            props.navigation.closeDrawer();
            signout();
          }}
        />
      </View>
    </View>
  );
}
