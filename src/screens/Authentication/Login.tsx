import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { auth } from '../../api/firebase';
import { RootStackParamList } from '../../utils/types';
import { login } from '../../contexts/slices/users/currentUserSlice';
import { StackNavigationProp } from '@react-navigation/stack';

interface LoginProps {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Check if user is logged in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });
    return unsub;
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, paddingTop: 100 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              paddingTop: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Montserrat',
                textAlign: 'center',
                fontSize: 32,
              }}
            >
              reminisce
            </Text>
          </View>

          <View style={{ alignItems: 'center', flex: 1, paddingTop: 30 }}>
            <View style={{ padding: 10, width: '99%' }}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#777777"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                keyboardAppearance="dark"
                onChangeText={setEmail}
              />
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
                />
              </View>
            </View>

            <View style={{ paddingTop: 20, padding: 10, width: '99%' }}>
              <TouchableOpacity
                onPress={() => login(email, password)}
                activeOpacity={0.8}
                style={{
                  backgroundColor: '#edecec',
                  borderWidth: 1,
                  borderColor: '#1F1E1E',
                  borderRadius: 48,
                  height: 50,
                }}
                testID="login-btn"
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
                  Log In
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingTop: 250,
              }}
            >
              <Text
                style={{ color: '#747980', fontSize: 12, fontWeight: '500' }}
              >
                Don't have an account?
              </Text>
              <Text
                style={{ fontSize: 12, color: '#10f0fe', paddingLeft: 5 }}
                onPress={() => navigation.push('Signup')}
                testID="login-to-signup"
              >
                Sign Up
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
