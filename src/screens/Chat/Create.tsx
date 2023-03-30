import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  LogBox,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';
import Header from '../../ui/components/Extra/Header';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// @ts-ignore
import { MAPS_API_KEY } from '@env';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchUsers } from '../../contexts/slices/users/usersSlice';
import { DocumentData } from 'firebase/firestore';

interface CreateChatProps {
  navigation: StackNavigationProp<RootStackParamList, 'Post'>;
}

export default function Create({ navigation }: CreateChatProps) {
  const [name, setName] = useState<string>('');
  const [members, setMembers] = useState<DocumentData[]>([]);
  const [location, setLocation] = useState<object>({});
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <Header
              title="New Chat"
              navigation={navigation}
              close={false}
              onSave={() => {}}
              text="Create"
            />

            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <View style={{ padding: 10, width: '90%' }}></View>

              <View style={{ padding: 10, width: '95%' }}>
                <TextInput
                  style={styles.input}
                  placeholder="Add a name"
                  placeholderTextColor="#777777"
                  onChangeText={(text) => setName(text)}
                  keyboardAppearance="dark"
                  testID="chat-name"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Add members"
                  placeholderTextColor="#777777"
                  onChangeText={(text) => setMembers(text.split(',') as any)}
                  keyboardAppearance="dark"
                  testID="chat-members"
                />

                <GooglePlacesAutocomplete
                  placeholder="Demographic"
                  minLength={2}
                  keyboardShouldPersistTaps="handled"
                  listViewDisplayed={false}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  debounce={400}
                  styles={{
                    listView: {
                      borderRadius: 6,
                      borderBottomColor: '#c73131',
                    },
                    row: {
                      backgroundColor: '#050505',
                    },
                    description: {
                      color: '#fff',
                      fontSize: 12,
                      right: 10,
                    },
                  }}
                  query={{
                    key: MAPS_API_KEY,
                    language: 'en',
                  }}
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    setLocation({
                      name: data.description,
                      lat: details?.geometry.location.lat,
                      lng: details?.geometry.location.lng,
                    });
                  }}
                  enablePoweredByContainer={false}
                  textInputProps={{
                    placeholderTextColor: '#777777',
                    style: {
                      width: '100%',
                      borderWidth: 0.5,
                      backgroundColor: '#0c0c0c',
                      borderColor: '#1F1E1E',
                      marginBottom: 15,
                      marginTop: 5,
                      height: 50,
                      textAlignVertical: 'top',
                      color: '#fff',
                      alignItems: 'stretch',
                      flexShrink: 1,
                      borderRadius: 4,
                      paddingLeft: 8,
                      fontSize: 15,
                    },
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    backgroundColor: '#0c0c0c',
    borderColor: '#1F1E1E',
    marginBottom: 15,
    marginTop: 5,
    height: 50,
    textAlignVertical: 'top',
    color: '#fff',
    alignItems: 'stretch',
    flexShrink: 1,
    borderRadius: 4,
    paddingLeft: 8,
    fontSize: 15,
  },
  inputDesc: {
    borderWidth: 0.5,
    backgroundColor: '#0c0c0c',
    borderColor: '#1F1E1E',
    marginBottom: 15,
    marginTop: 5,
    height: 100,
    textAlignVertical: 'top',
    color: '#fff',
    alignItems: 'stretch',
    flexShrink: 1,
    borderRadius: 4,
    paddingLeft: 8,
    fontSize: 15,
  },
  text: {
    color: '#fff',
    fontWeight: '500',
  },
});
