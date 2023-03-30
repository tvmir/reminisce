import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import { DocumentData } from 'firebase/firestore';
import { RootStackParamList } from '../../../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector } from '../../../utils/hooks';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { deleteScrapbook } from '../../../contexts/services/scrapbook';

// constants
const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2.25;
const CARD_HEIGHT = 170;

interface ProfileCardDetailsProps {
  item: DocumentData | undefined;
  navigation: StackNavigationProp<
    RootStackParamList,
    'Profile' | 'UsersProfile'
  >;
}

export default function ProfileCardDetails({
  item,
  navigation,
}: ProfileCardDetailsProps) {
  const { showActionSheetWithOptions } = useActionSheet();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  // Options for deleting or editing a scrapbook
  const currentUserMenu = (): void => {
    const options = ['Delete', 'Edit', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 1:
            alert('Edit');
            break;

          case destructiveButtonIndex:
            deleteScrapbook(item?.id);
            break;

          case cancelButtonIndex:
        }
      }
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          left: 7,
          paddingRight: 14,
        }}
      >
        <View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            borderWidth: 0.5,
            borderRadius: 16,
            borderColor: '#121212',
          }}
        >
          <TouchableWithoutFeedback
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
            onPress={() => navigation.navigate('Scrapbook', { item })}
          >
            <SharedElement id={`${item?.id}.images`}>
              <View
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT - 60,
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
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT - 60,
                    resizeMode: 'cover',
                  }}
                  source={{ uri: item?.images[0] }}
                />
              </View>
            </SharedElement>
          </TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={{
                  marginVertical: 4,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#d3d6d9',
                }}
              >
                {item?.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontSize: 12, color: '#8e8e8e' }}
              >
                {item?.location.name}
              </Text>
            </View>
            {currentUser?.uid === item?.uid ? (
              <TouchableOpacity onPress={currentUserMenu}>
                <Entypo
                  name="dots-three-horizontal"
                  size={13}
                  color="#d3d6d9"
                />
              </TouchableOpacity>
            ) : (
              <Entypo name="dots-three-horizontal" size={13} color="#d3d6d9" />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
