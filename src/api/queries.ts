import { auth, db } from '../api/firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

export const writeNewScrapbook = async (
  name: string,
  description: string,
  location: string,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Post'>,
  images: string[],
  // images: string[],
  tags: string[] = []
) => {
  await addDoc(collection(db, 'scrapbooks'), {
    uid: auth.currentUser?.uid,
    name,
    description,
    location,
    tags,
    images,
    createdAt: serverTimestamp(),
    likes_count: 0,
    comments_count: 0,
    // images,
  }).then(() => {
    // Returning to the feed page
    // navigation.popToTop();
    console.log('IMAGES:', images);
  });
};

export const updateProfilePicture = async (downloadURL: string) => {
  const scrapbookUserRef = doc(db, 'users', auth.currentUser?.uid!!);
  await updateDoc(scrapbookUserRef, {
    photoURL: downloadURL,
  })
    .then(() => {
      // navigation.pop();
      console.log('Profile picture has been updated successfully');
    })
    .catch((err) => {
      console.log('Error updating profile picture: ', err);
    });
};
