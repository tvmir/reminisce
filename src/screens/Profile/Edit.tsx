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
import { RootStackParamList } from '../../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';

interface EditProps {
  route: RouteProp<
    { params: { field: DocumentData; value: DocumentData } },
    'params'
  >;
  navigation: StackNavigationProp<RootStackParamList, 'EditProfile'>;
}

export default function Edit({ route, navigation }: EditProps) {
  const { field, value } = route.params;
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const [inputBio, setInputBio] = useState<string>(value.bio);
  const [inputName, setInputName] = useState<string>(value.name);
  const [inputLocation, setInputLocation] = useState<string>(value.location);

  // Using an ImagePicker to allow the user to change their profile picture
  const editProfilePicture = async (): Promise<void> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    if (!result.canceled) {
      uploadProfilePicture(result.assets[0].uri);
    }
  };

  // Accessing the specific field the user wants to edit and updating its value
  const editFieldValues = (): void => {
    field.name && field.bio && field.location
      ? updateUserDetails(field.name, inputName).then(() => {
          updateUserDetails(field.bio, inputBio).then(() => {
            updateUserDetails(field.location, inputLocation).then(() => {
              alert('Your profile has been updated! 🎉');
              navigation.goBack();
            });
          });
        })
      : field.name && field.bio
      ? updateUserDetails(field.name, inputName).then(() => {
          updateUserDetails(field.bio, inputBio).then(() => {
            alert('Your profile has been updated! 🎉');
            navigation.goBack();
          });
        })
      : field.name && field.location
      ? updateUserDetails(field.name, inputName).then(() => {
          updateUserDetails(field.location, inputLocation).then(() => {
            alert('Your profile has been updated! 🎉');
            navigation.goBack();
          });
        })
      : field.bio && field.location
      ? updateUserDetails(field.bio, inputBio).then(() => {
          updateUserDetails(field.location, inputLocation).then(() => {
            alert('Your profile has been updated! 🎉');
            navigation.goBack();
          });
        })
      : field.name
      ? updateUserDetails(field.name, inputName).then(() => {
          alert('Your profile has been updated! 🎉');
          navigation.goBack();
        })
      : field.bio
      ? updateUserDetails(field.bio, inputBio).then(() => {
          alert('Your profile has been updated! 🎉');
          navigation.goBack();
        })
      : field.location
      ? updateUserDetails(field.location, inputLocation).then(() => {
          alert('Your profile has been updated! 🎉');
          navigation.goBack();
        })
      : null;
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }} testID="update-profile-details">
            <Header
              title="Edit Profile"
              navigation={navigation}
              close={false}
              onSave={editFieldValues}
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
                testID="edit-profile-picture"
              >
                <Image
                  style={{ height: 120, width: 120, position: 'absolute' }}
                  source={{ uri: currentUser?.photoURL }}
                />
                <Feather name="camera" size={28} color="white" />
              </TouchableOpacity>
              <View style={{ padding: 10, width: '95%', paddingTop: 30 }}>
                <TextInput
                  style={styles.input}
                  placeholder={inputName}
                  placeholderTextColor="#959595"
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  onChangeText={setInputName}
                  testID="edit-name"
                />
                <View>
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
                    testID="edit-bio"
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
                <GooglePlacesAutocomplete
                  placeholder={inputLocation}
                  listViewDisplayed={false}
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
                    setInputLocation(details?.formatted_address!);
                  }}
                  onFail={(error) => console.log(error)}
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
  inputBio: {
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
