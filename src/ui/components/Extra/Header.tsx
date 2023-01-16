import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title: string;
  navigation: any;
  onSave?: any;
  text?: any;
}

export default function Header({
  title,
  navigation,
  onSave,
  text,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      {onSave ? (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            activeOpacity={0.8}
          >
            <Ionicons
              style={{ paddingRight: 25 }}
              name="ios-chevron-back"
              size={30}
              color="white"
            />
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onSave} activeOpacity={0.8}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>
              {text}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="ios-chevron-back" size={30} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onSave} activeOpacity={0.8}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>
              {text}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    // textAlign: 'center',
    paddingRight: 15,
  },
});
