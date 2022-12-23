import { auth, db } from '../api/firebase';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

// Add a new 'scrapbook' using the user's id and placing it in the 'user_scrapbooks' collection
export const writeNewUserScrapbook = async (
  description: string,
  location: string,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>,
  downloadURL: string,
  tags: string[] = []
) => {
  const scrapbookUserRef = doc(db, 'scrapbooks', auth.currentUser?.uid!!);
  await addDoc(collection(scrapbookUserRef, 'user_scrapbooks'), {
    description,
    location,
    tags,
    downloadURL,
    createdAt: serverTimestamp(),
  }).then(() => {
    // Returning to the feed page
    navigation.popToTop();
  });
};
