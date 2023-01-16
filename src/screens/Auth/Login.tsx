import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { auth } from '../../api/firebase';
import { LoginButton } from '../../ui/shared/Button';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scale';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { login } from '../../contexts/slices/users/currentUserSlice';

interface LoginProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });
    return unsub;
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 100,
        }}
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
                fontWeight: 'bold',
                paddingHorizontal: 20,
              }}
            >
              Login
            </Text>

            <View style={{ alignItems: 'center', marginTop: 50, flex: 1 }}>
              <View style={{ padding: 10, width: '90%' }}>
                <Text style={styles.text}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#959595"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  onChangeText={setEmail}
                />
                <View>
                  <Text style={styles.text}>Password</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholderTextColor="#959595"
                    keyboardType="default"
                    autoCapitalize="none"
                    keyboardAppearance="dark"
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              <Text
                style={{
                  position: 'absolute',
                  top: 165,
                  right: 31,
                  color: '#10f0fe',
                }}
              >
                Forgot Passoword?
              </Text>

              <View style={{ paddingTop: 30, width: '60%' }}>
                <TouchableOpacity
                  onPress={() => login(email, password)}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#101010',
                    borderWidth: 1,
                    borderColor: '#1F1E1E',
                    borderRadius: 6,
                    height: 40,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      top: 8,
                      fontSize: 16,
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 320,
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
                >
                  Signup
                </Text>
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
