import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  updateUserDetails,
  uploadProfilePicture,
} from '../../contexts/services/user';
import { useAppSelector } from '../../utils/hooks';
import Header from '../../ui/components/Extra/Header';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// @ts-ignore
import { MAPS_API_KEY } from '@env';
import { RouteProp } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

interface EditProps {
  route: RouteProp<
    { params: { field: DocumentData; value: DocumentData } },
    'params'
  >;
  navigation: NativeStackScreenProps<RootStackParamList>;
}

export default function Edit({ route, navigation }: EditProps) {
  const { field, value } = route.params;
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const [inputBio, setInputBio] = useState<string>(value.bio);
  const [inputName, setInputName] = useState<string>(value.name);
  const [inputLocation, setInputLocation] = useState<string>(value.location);

  const editProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    if (!result.canceled) {
      // @ts-ignore
      uploadProfilePicture(result.assets[0]?.map((asset) => asset.uri));
    }
  };

  const editDetails = () => {
    if (field.name) updateUserDetails(field.name, inputName);

    if (field.bio) updateUserDetails(field.bio, inputBio);

    if (field.location) updateUserDetails(field.location, inputLocation);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <Header
              title="Edit Profile"
              navigation={navigation}
              close={false}
              onSave={editDetails}
              text="Done"
            />
            <View style={{ alignItems: 'center', marginTop: 25 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#272727',
                  height: 120,
                  width: 120,
                  borderRadius: 60,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={editProfilePicture}
              >
                <Image
                  style={{ height: 120, width: 120, position: 'absolute' }}
                  source={{ uri: currentUser?.photoURL }}
                />
                <Feather name="camera" size={28} color="white" />
              </TouchableOpacity>
              <View style={{ padding: 10, width: '90%' }}>
                <Text style={styles.text}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder={inputName}
                  placeholderTextColor="#959595"
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  onChangeText={setInputName}
                />
                <View>
                  <Text style={styles.text}>Bio</Text>
                  <TextInput
                    style={styles.inputBio}
                    multiline={true}
                    placeholder={inputBio}
                    placeholderTextColor="#959595"
                    keyboardType="default"
                    autoCapitalize="none"
                    maxLength={70}
                    keyboardAppearance="dark"
                    onChangeText={setInputBio}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 18,
                      right: 5,
                      color: '#6e6e6e',
                      fontSize: 12,
                    }}
                  >
                    {inputBio.length + '/70'}
                  </Text>
                </View>
                <Text style={styles.text}>Location</Text>
                <GooglePlacesAutocomplete
                  placeholder={inputLocation}
                  listViewDisplayed={false}
                  // keyboardShouldPersistTaps="handled"
                  minLength={2}
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
                    console.log('DATA', data);
                    console.log('DETAILS', details);
                    //@ts-ignore
                    setInputLocation(details?.formatted_address);
                  }}
                  onFail={(error) => console.log(error)}
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
  inputBio: {
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
