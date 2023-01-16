import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
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
  tags: string[],
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
    tags,
  })
    .then(() => {
      console.log('Images:', urls);
      // TODO: cutomize alert
      alert('Your scrapbook has been posted! 🎉');
      navigation.popToTop();
    })
    .catch((err) => {
      console.log('Error uploading scrapbook:', err);
    });
};

// Likes and comments are stored in subcollections of the scrapbook document. This is because we
// want to be able to query them without having to fetch the entire scrapbook document

// Fetching likes
export const fetchLikes = async (sid: string, uid: string) => {
  const likesRef = doc(db, 'scrapbooks', sid);
  const likesDoc = await getDoc(doc(likesRef, 'likes', uid));
  return likesDoc.exists();
};

// Updating likes (either adding or removing it from the subcollection) stored as the uid of the user who liked it
export const updateLikes = async (
  sid: string,
  uid: string,
  isLiked: boolean
) => {
  const likesRef = doc(db, 'scrapbooks', sid);
  const likesId = await getDoc(doc(likesRef, 'likes', uid));

  if (isLiked || likesId.exists()) {
    await deleteDoc(doc(likesRef, 'likes', uid));
  } else {
    await setDoc(doc(likesRef, 'likes', uid), {});
  }
};

// Updating the likes count of the scrapbook, handled by a transaction
export const updateLikeCount = async (
  sid: string,
  uid: string,
  isLiked: any,
  setIsLiked: any
) => {
  const likesRef = doc(db, 'scrapbooks', sid);
  const likesId = await getDoc(doc(likesRef, 'likes', uid));

  if (isLiked.liked || likesId.exists()) {
    await runTransaction(db, async (transaction) => {
      const likesDoc = await transaction.get(likesRef);
      const likes = likesDoc.get('likes_count');
      if (likes > 0) {
        const newLikeCount = likesDoc?.data()?.likes_count - 1;
        transaction.update(likesRef, { likes_count: newLikeCount });
        setIsLiked({
          liked: !isLiked.liked,
          counter: newLikeCount,
        });
      }
    });
  } else {
    await runTransaction(db, async (transaction) => {
      const likesDoc = await transaction.get(likesRef);
      console.log('DOC', likesDoc.data());
      const newLikeCount = likesDoc?.data()?.likes_count + 1;
      transaction.update(likesRef, { likes_count: newLikeCount });
      setIsLiked({
        liked: !isLiked.liked,
        counter: newLikeCount,
      });
    });
  }
  updateLikes(sid, uid, isLiked.liked);
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
  updateCommentCount(sid);
};

let commentsListener: any = null;

// Fetching comments of a given scrapbook
export const fetchComments = async (
  sid: string,
  setComments: React.Dispatch<React.SetStateAction<any>>
) => {
  const commentsRef = doc(db, 'scrapbooks', sid);
  const q = query(
    collection(commentsRef, 'comments'),
    orderBy('createdAt', 'desc')
  );

  commentsListener = onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.docChanges().length === 0) return;
    let comment = querySnapshot.docs.map((value) => {
      return { id: value.id, ...value.data() };
    });
    setComments(comment);
  });
};

// Updating the comments count of the scrapbook
export const updateCommentCount = async (sid: string) => {
  const commentsRef = doc(db, 'scrapbooks', sid);
  const commentsCount = await getDoc(commentsRef).then(
    (doc) => doc.data()?.comments_count
  );
  const newCommentCount = commentsCount + 1;
  await updateDoc(commentsRef, { comments_count: newCommentCount });
};

// Detaching comments listener to prevent memory leaks and unnecessary calls to the database
export const detachCommentsListener = () => {
  console.log('Detaching comments listener...');
  if (commentsListener != null) {
    commentsListener();
    commentsListener = null;
  }
};
