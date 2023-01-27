import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Onboard({ navigation }: any) {
  return (
    <View>
      <View>
        <ImageBackground
          style={{
            height: '80%',
            opacity: 0.8,
          }}
          source={require('../../../assets/photo2.jpeg')}
        ></ImageBackground>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          backgroundColor: '#F5F5F5',
          paddingVertical: 16,
          // paddingHorizontal: Spacing * 2,
          width: '58%',
          borderRadius: 32,

          alignItems: 'center',
          shadowOpacity: 0.3,
          shadowRadius: 16,
        }}
      >
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            textAlign: 'center',
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
