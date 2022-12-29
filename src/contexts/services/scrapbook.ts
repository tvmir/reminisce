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
import { auth, db } from '../../api/firebase';
import { writeNewScrapbook } from '../../api/queries';
import { RootStackParamList } from '../../utils/types';

// Uploading images to Firebase Storage. From there, we can extract the image URL and store it
// with the rest of the scrapbook details in the database.
export const uploadScrapbook = async (
  images: string[],
  description: string,
  location: string,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Post'>
) => {
  // new Promise((resolve, reject) => {
  const promises: string[] = [];
  images.map(async (image: string) => {
    const path = `scrapbooks/${auth.currentUser?.uid}/${Math.random().toString(
      36
    )}`;
    const storage = getStorage();
    const response = await fetch(image);
    const storageRef = ref(storage, path);
    const blob = await response.blob();
    const metadata = { contentType: 'image/jpeg' };

    console.log('Storage PATH:', path);

    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Uploading... ' + Math.floor(progress) + '%');
      },
      (err) => {
        console.log(err);
      },
      () => {
        // Promise.all(promises)
        //   .then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          promises.push(downloadURL);
          writeNewScrapbook(description, location, navigation, promises);
        });
      }
    );
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
