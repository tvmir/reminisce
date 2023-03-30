import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { signup } from '../../contexts/slices/users/currentUserSlice';

export default function Signup() {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Initialize empty variables
  const bio = '';
  const location = '';
  const followers_count = 0;
  const following_count = 0;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, paddingTop: 100 }}
    >
      <ScrollView
        contentContainerStyle={{ paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 32,
                fontWeight: '500',
                paddingHorizontal: 20,
              }}
            >
              Sign Up
            </Text>
            <View style={{ alignItems: 'center', flex: 1, paddingTop: 30 }}>
              <View style={{ padding: 10, width: '99%' }}>
                {/* <Text style={styles.text}>Name</Text> */}
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#777777"
                  placeholder="Enter your name"
                  keyboardAppearance="dark"
                  onChangeText={setName}
                  value={name}
                  testID="signup-name"
                />
                <View>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#777777"
                    placeholder="Enter your username"
                    autoCapitalize="none"
                    keyboardAppearance="dark"
                    onChangeText={setUsername}
                    value={username}
                    testID="signup-username"
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#777777"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    keyboardAppearance="dark"
                    onChangeText={setEmail}
                    value={email}
                    testID="signup-email"
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholderTextColor="#777777"
                    placeholder="Enter your password"
                    keyboardType="default"
                    autoCapitalize="none"
                    keyboardAppearance="dark"
                    onChangeText={setPassword}
                    value={password}
                    testID="signup-password"
                  />
                </View>
              </View>
              <View style={{ paddingTop: 20, padding: 10, width: '99%' }}>
                <TouchableOpacity
                  onPress={() =>
                    signup(
                      email,
                      password,
                      name,
                      username,
                      bio,
                      location,
                      followers_count,
                      following_count
                    )
                  }
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#edecec',
                    borderWidth: 1,
                    borderColor: '#1F1E1E',
                    borderRadius: 48,
                    height: 50,
                  }}
                  testID="signup-btn"
                >
                  <Text
                    style={{
                      color: 'black',
                      textAlign: 'center',
                      top: 14,
                      fontSize: 18,
                      fontWeight: '500',
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
    fontSize: 16,
  },
  text: {
    color: '#fff',
    fontWeight: '500',
  },
});
