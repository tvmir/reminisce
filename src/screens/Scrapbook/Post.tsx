import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  LogBox,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { writeScrapbook } from '../../contexts/services/scrapbook';
import Header from '../../ui/components/Extra/Header';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// @ts-ignore
import { MAPS_API_KEY } from '@env';

interface PostProps {
  route: RouteProp<{ params: { images: string[] } }, 'params'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Post'>;
}

export default function Post({ route, navigation }: PostProps) {
  const { images } = route.params;
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<{}>({});
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
              onSave={() =>
                writeScrapbook(
                  name,
                  images,
                  description,
                  location,
                  tags,
                  navigation
                )
              }
              text="Post"
            />

            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <View style={{ padding: 10, width: '90%' }}>
                <Text style={styles.text}>Cover</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#656565',
                  height: 120,
                  width: 180,
                  borderRadius: 6,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 15,
                }}
              >
                <Image
                  style={{ height: 120, width: 180, position: 'absolute' }}
                  source={{ uri: images[0] }}
                />
              </View>
              <View style={{ padding: 10, width: '90%' }}>
                <Text style={styles.text}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name your scrapbook..."
                  placeholderTextColor="#959595"
                  onChangeText={(text) => setName(text)}
                  keyboardAppearance="dark"
                />
                <Text style={styles.text}>Description</Text>
                <TextInput
                  style={styles.inputDesc}
                  placeholder="Write a description..."
                  placeholderTextColor="#edededb2"
                  multiline={true}
                  onChangeText={(text) => setDescription(text)}
                  keyboardAppearance="dark"
                />

                <Text style={styles.text}>Location</Text>

                <GooglePlacesAutocomplete
                  placeholder="Where was this taken?"
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

                    // console.log({
                    //   name: data.description,
                    //   lat: details?.geometry.location.lat,
                    //   lng: details?.geometry.location.lng,
                    // });
                  }}
                  enablePoweredByContainer={false}
                  textInputProps={{
                    placeholderTextColor: '#959595',
                    style: {
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#1F1E1E',
                      marginBottom: 15,
                      marginTop: 5,
                      height: 42,
                      textAlignVertical: 'top',
                      color: '#fff',
                      alignItems: 'stretch',
                      flexShrink: 1,
                      borderRadius: 4,
                      paddingLeft: 8,
                    },
                  }}
                />
                <Text style={{ color: 'white', fontWeight: '500' }}>Tags</Text>
                <TextInput
                  style={styles.input}
                  placeholder="comma, separated"
                  placeholderTextColor="#959595"
                  onChangeText={(text) => setTags(text.split(','))}
                  keyboardAppearance="dark"
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
    borderWidth: 1,
    borderColor: '#1F1E1E',
    marginBottom: 15,
    marginTop: 5,
    height: 42,
    textAlignVertical: 'top',
    color: '#fff',
    alignItems: 'stretch',
    flexShrink: 1,
    borderRadius: 4,
    paddingLeft: 8,
  },
  inputDesc: {
    borderWidth: 1,
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
  },
  text: {
    color: '#fff',
    fontWeight: '500',
  },
});
