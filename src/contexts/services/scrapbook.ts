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
import { getDownloadURL } from 'firebase/storage';
import { auth, db } from '../../api/firebase';
import { RootStackParamList } from '../../utils/types';
import { uploadImage } from './storage';

// Uploading images to Firebase Storage. From there, we can extract the image URL and store it
// with the rest of the scrapbook details in the database
export const uploadScrapbookImages = async (image: string) => {
  const path = `scrapbooks/${auth.currentUser?.uid}/${Math.random().toString(
    36
  )}`;
  const uploadTask = await uploadImage(image, path);
  const downloadURL = await getDownloadURL(uploadTask.ref)
    .then((downloadURL) => {
      return downloadURL;
    })
    .catch((err) => {
      console.log('Error getting download URL:', err);
    });
  return downloadURL;
};

// Adding a new scrapbook to the database
export const writeScrapbook = async (
  name: string,
  images: string[],
  description: string,
  location: string,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Post'>
) => {
  const urls = await Promise.all(
    images.map((image) => uploadScrapbookImages(image))
  );

  await addDoc(collection(db, 'scrapbooks'), {
    uid: auth.currentUser?.uid,
    name,
    description,
    location,
    images: urls,
    createdAt: serverTimestamp(),
    likes_count: 0,
    comments_count: 0,
    // tags will be added later
  })
    .then(() => {
      console.log('Images:', urls);
      // navigation.popToTop();
    })
    .catch((err) => {
      console.log('Error uploading scrapbook:', err);
    });
};

// Likes and comments are stored in subcollections of the scrapbook document. This is because we
// want to be able to query them without having to fetch the entire scrapbook document

// Fetching likes
export const fetchLikes = (sid: string, uid: string) =>
  new Promise<boolean>(async (resolve, reject) => {
    const likesRef = doc(db, 'scrapbooks', sid);
    const likesSnapshot = await getDoc(doc(likesRef, 'likes', uid))
      .then((doc) => {
        resolve(doc.exists());
      })
      .catch((err) => {
        console.log('Error getting likes:', err);
        reject(err);
      });

    return likesSnapshot;
  });

// Updating likes (either adding or removing it from the subcollection) stored as the uid of the user who liked it
export const updateLikes = async (
  sid: string,
  uid: string,
  isLiked: boolean
) => {
  if (isLiked) {
    const likesRef = doc(db, 'scrapbooks', sid);
    await deleteDoc(doc(likesRef, 'likes', uid));
  } else {
    const likesRef = doc(db, 'scrapbooks', sid);
    await setDoc(doc(likesRef, 'likes', uid), {});
  }
};

// Adding a comment
export const writeComment = async (
  sid: string,
  uid: string,
  comment: string
) => {
  const commentsRef = doc(db, 'scrapbooks', sid);
  await addDoc(collection(commentsRef, 'comments'), {
    uid,
    comment,
    createdAt: serverTimestamp(),
  }).then(() => {
    console.log('Comment has been sent');
  });
};

// Fetching comments of given scrapbook
// TODO: Get onSnapshot to work, without it the comments don't update in real time
export const fetchComments = async (sid: string, setComments: any) => {
  const commentsRef = doc(db, 'scrapbooks', sid);
  const q = query(
    collection(commentsRef, 'comments'),
    orderBy('createdAt', 'desc')
  );
  const commentsSnap = await getDocs(q);
  const comment = commentsSnap.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  setComments(comment);

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
