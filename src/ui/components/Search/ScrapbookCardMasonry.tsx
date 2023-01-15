import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { theme } from '../../shared/Theme';
import * as Animatable from 'react-native-animatable';
import { useUserQuery } from '../../../utils/hooks';

export default function ScrapbookCardMasonry({ item, index, navigation }: any) {
  const even = index % 2 === 0;
  const user = useUserQuery(item.uid).data;

  return (
    <Animated.View
      style={{
        paddingTop: index === 1 ? 16 : 0,
        paddingLeft: !even ? 16 / 2 : 0,
        paddingRight: even ? 16 / 2 : 0,
        paddingBottom: 16,
      }}
    >
      <TouchableOpacity
        style={[
          styles.card,
          { width: '100%', height: index % 3 === 0 ? 150 : 215 },
        ]}
        onPress={() => navigation.navigate('ExpandedFeed', { item })}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <SharedElement id={`${item.id}.images`} style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                overflow: 'hidden',
              }}
            >
              <Animatable.Image
                animation={'fadeInUp'}
                easing="ease-in-out"
                delay={300}
                duration={300}
                source={{
                  uri: item.images[0],
                }}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
          </SharedElement>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
          >
            <Image
              source={{ uri: user?.photoURL }}
              style={{
                backgroundColor: '#656565',
                position: 'absolute',
                width: 25,
                height: 25,
                left: 10,
                bottom: 47,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#121212',
                overflow: 'hidden',
              }}
            />
            <View style={{ flex: 1, paddingVertical: 5 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#d3d6d9',
                }}
              >
                {item.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontSize: 12, color: '#8e8e8e' }}
              >
                {item.location}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 200,
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    borderColor: '#121212',
    borderWidth: 1,
  },
});
