import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
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
import { writeScrapbook } from '../../contexts/services/scrapbook';
import Header from '../../ui/components/Extra/Header';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// @ts-ignore
import { MAPS_API_KEY } from '@env';
import { StackNavigationProp } from '@react-navigation/stack';

interface PostProps {
  route: RouteProp<{ params: { images: string[] } }, 'params'>;
  navigation: StackNavigationProp<RootStackParamList, 'Post'>;
}

export default function Post({ route, navigation }: PostProps) {
  const { images } = route.params;
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<object>({});
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <Header
              title="New Scrapbook"
              navigation={navigation}
              close={false}
              onSave={() => {
                writeScrapbook(
                  name,
                  images,
                  description,
                  location,
                  tags,
                  navigation
                );
              }}
              text="Post"
            />

            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <View style={{ padding: 10, width: '90%' }}></View>
              <View
                style={{
                  backgroundColor: '#656565',
                  height: 140,
                  width: 200,
                  borderRadius: 8,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 15,
                }}
              >
                <Image
                  style={{
                    height: 140,
                    width: 200,
                    position: 'absolute',
                    borderRadius: 8,
                  }}
                  source={{ uri: images[0] }}
                />
              </View>
              <View style={{ padding: 10, width: '95%' }}>
                <TextInput
                  style={styles.input}
                  placeholder="Name your scrapbook"
                  placeholderTextColor="#777777"
                  onChangeText={(text) => setName(text)}
                  keyboardAppearance="dark"
                  testID="add-scrapbook-name"
                />
                <TextInput
                  style={styles.inputDesc}
                  placeholder="Add a description"
                  placeholderTextColor="#777777"
                  multiline={true}
                  onChangeText={(text) => setDescription(text)}
                  keyboardAppearance="dark"
                  testID="add-scrapbook-description"
                />

                <GooglePlacesAutocomplete
                  placeholder="Where was this taken?"
                  minLength={2}
                  // currentLocation={true}
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
                <TextInput
                  style={styles.input}
                  placeholder="Tags (separate with commas and spaces)"
                  placeholderTextColor="#777777"
                  onChangeText={(text) => setTags(text.split(/(?:,| )+/))}
                  keyboardAppearance="dark"
                  autoCapitalize="none"
                  testID="add-scrapbook-tags"
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
