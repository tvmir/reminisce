import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { auth, db } from '../../api/firebase';
import { writeNewScrapbook } from '../../api/queries';
import { RootStackParamList } from '../../utils/types';

// const [image, setImage] = useState<string>('');

// Uploading images to Firebase Storage. From there, we can extract the image URL and store it
// with the rest of the scrapbook details in the database.
export const uploadImages = async (image: string) => {
  const path = `scrapbooks/${auth.currentUser?.uid}/${Math.random().toString(
    36
  )}`;
  const storage = getStorage();
  const response = await fetch(image);
  const storageRef = ref(storage, path);
  const blob = await response.blob();
  const metadata = { contentType: 'image/jpeg' };

  console.log('Storage PATH:', path);

  const uploadTask = await uploadBytesResumable(storageRef, blob, metadata);
  const downloadURL = await getDownloadURL(uploadTask.ref);
  return downloadURL;
};

export const uploadScrapbook = async (
  name: string,
  images: string[],
  description: string,
  location: string,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Post'>
) => {
  const urls = await Promise.all(images.map((image) => uploadImages(image)));

  await addDoc(collection(db, 'scrapbooks'), {
    uid: auth.currentUser?.uid,
    name,
    description,
    location,
    images: urls,
    createdAt: serverTimestamp(),
    likes_count: 0,
    comments_count: 0,
  })
    .then(() => {
      console.log('Images:', urls);
      // navigation.popToTop();
    })
    .catch((err) => {
      console.log('Error uploading scrapbook:', err);
    });
};

export const fetchLikes = async (scrapbookId: string, uid: string) =>
  new Promise(async (resolve, reject) => {
    const likesRef = doc(db, 'scrapbooks', scrapbookId);
    const likesSnapshot = await getDoc(doc(likesRef, 'likes', uid));
    if (likesSnapshot.exists()) {
      resolve(likesSnapshot.data());
    }
  });

export const updateLikes = async (
  scrapbookId: string,
  uid: string,
  isLiked: boolean
) => {
  if (isLiked) {
    const likesRef = doc(db, 'scrapbooks', scrapbookId);
    await deleteDoc(doc(likesRef, 'likes', uid));
  } else {
    const likesRef = doc(db, 'scrapbooks', scrapbookId);
    await setDoc(doc(likesRef, 'likes', uid), {});
  }
};

export const writeComment = async (
  scrapbookId: string,
  uid: string,
  comment: string
) =>
  new Promise(async (resolve, reject) => {
    const commentsRef = doc(db, 'scrapbooks', scrapbookId);
    await addDoc(collection(commentsRef, 'comments'), {
      uid,
      comment,
      createdAt: serverTimestamp(),
    }).then(() => {
      console.log('Comment has been sent');
    });
  });

// TODO: Get onSnapshot to work, without it the comments don't update in real time
export const fetchComments = async (scrapbookId: string, setComments: any) => {
  const commentsRef = doc(db, 'scrapbooks', scrapbookId);
  const q = query(
    collection(commentsRef, 'comments'),
    orderBy('createdAt', 'desc')
  );
  const commentsSnap = await getDocs(q);
  const a = commentsSnap.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  setComments(a);

  // const commentsSnap = onSnapshot(q, (snap) => {
  //   if (snap.docChanges.length === 0) return;
  //   let c = snap.docs.map((doc) => {
  //     return { id: doc.id, ...doc.data() };
  //   });
  //   // return c;
  //   setComments(c);
  // });
  // // setComments(commentsSnap);
  // return commentsSnap;
};
