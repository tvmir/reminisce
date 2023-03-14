import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
} from 'firebase/storage';
import { auth, db } from '../../api/firebase';
import { uploadImage } from './storage';
import { fetchFollowingUsers } from './user';

// Uploading images to Firebase Storage. From there, we can extract the image URL and store it
// with the rest of the scrapbook details in the database
export const uploadScrapbookImages = async (
  image: string
): Promise<string | void> => {
  const path = `scrapbooks/${auth.currentUser?.uid}/${Math.random().toString(
    36
  )}`;
  const uploadTask = await uploadImage(image, path);
  const downloadURL = await getDownloadURL(uploadTask.ref)
    .then((url) => {
      console.log('Uploading...');
      return url;
    })
    .catch((err) => {
      console.log('Error getting downloadURL:', err);
    });

  return downloadURL;
};

// Adding a new scrapbook to the database
export const writeScrapbook = async (
  name: string,
  images: string[],
  description: string,
  location: object,
  tags: string[],
  navigation: any
): Promise<void> => {
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
      alert('Your scrapbook has been posted! 🎉');
      navigation.popToTop();
    })
    .catch((err) => {
      console.log('Error uploading scrapbook:', err);
    });
};

// Deleting a scrapbook from the database and the images from Firebase Storage
export const deleteScrapbook = async (sid: string): Promise<void> => {
  const scrapbookRef = doc(db, 'scrapbooks', sid);
  const scrapbookDoc = await getDoc(scrapbookRef);

  if (scrapbookDoc.exists()) {
    const { images } = scrapbookDoc.data();
    if (images !== null) {
      const storage = getStorage();
      const imagesRef = ref(storage, images);
      const imagesPathRef = ref(storage, imagesRef.fullPath);

      await deleteObject(imagesPathRef)
        .then(async () => {
          console.log('Images deleted successfully');
          await deleteDoc(scrapbookRef)
            .then(() => {
              console.log('Scrapbook deleted successfully');
            })
            .catch((err) => {
              console.log('Error deleting scrapbook:', err);
            });
        })
        .catch((err) => {
          console.log('Error deleting image:', err);
        });
    }
  }
};

// Updating a scrapbook's details

// Used for fetching the scrapbooks of the users that the current user is following
export const fetchFollowingScrapbooks = async (
  uid: string = auth.currentUser?.uid!
): Promise<
  {
    id: string;
  }[]
> => {
  const followingUsers = await fetchFollowingUsers(uid);
  const scrapbooksRef = collection(db, 'scrapbooks');
  if (followingUsers.length === 0) return [];
  const q = query(
    scrapbooksRef,
    where('uid', 'in', followingUsers),
    orderBy('createdAt', 'desc')
  );
  const scrapbooksSnapshot = await getDocs(q);
  const scrapbooks = scrapbooksSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return scrapbooks;
};

// Likes and comments are stored in subcollections of the scrapbook document. This is because we
// want to be able to query them without having to fetch the entire scrapbook document

// Fetching likes
export const fetchLikes = async (
  sid: string,
  uid: string
): Promise<boolean> => {
  const likesRef = doc(db, 'scrapbooks', sid);
  const likesDoc = await getDoc(doc(likesRef, 'likes', uid));
  return likesDoc.exists();
};

// Updating likes (either adding or removing it from the subcollection) stored as the uid of the user who liked it
export const updateLikes = async (
  sid: string,
  uid: string,
  isLiked: boolean
): Promise<void> => {
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
  isLiked: {
    liked: boolean;
  },
  setIsLiked: React.Dispatch<
    React.SetStateAction<{
      liked: boolean;
      counter: number;
    }>
  >
): Promise<void> => {
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
): Promise<void> => {
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

let commentsListener: Unsubscribe | null;

// Fetching comments of a given scrapbook
export const fetchComments = async (
  sid: string,
  setComments: React.Dispatch<React.SetStateAction<DocumentData[]>>
): Promise<void> => {
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
export const updateCommentCount = async (sid: string): Promise<void> => {
  const commentsRef = doc(db, 'scrapbooks', sid);
  const commentsCount = await getDoc(commentsRef).then(
    (doc) => doc.data()?.comments_count + 1
  );
  await updateDoc(commentsRef, { comments_count: commentsCount });
};

// Detaching comments listener to prevent memory leaks and unnecessary calls to the database
export const detachCommentsListener = (): void => {
  console.log('Detaching comments listener...');
  if (commentsListener != null) {
    commentsListener();
    commentsListener = null;
  }
};

// Adding a reply to a comment
export const writeReply = async (
  sid: string,
  uid: string,
  cid: string,
  reply: string
): Promise<void> => {
  const commentsRef = doc(db, 'scrapbooks', sid);
  const repliesRef = doc(commentsRef, 'comments', cid);
  await addDoc(collection(repliesRef, 'replies'), {
    uid,
    cid,
    reply,
    createdAt: serverTimestamp(),
  }).then(() => {
    console.log('Reply has been sent');
  });
};

let repliesListener: Unsubscribe | null;

// Fetching replies of a given comment
export const fetchReplies = async (
  sid: string,
  cid: string,
  setReplies: React.Dispatch<React.SetStateAction<DocumentData[]>>
): Promise<void> => {
  const commentsRef = doc(db, 'scrapbooks', sid);
  const repliesRef = doc(commentsRef, 'comments', cid);
  const q = query(
    collection(repliesRef, 'replies'),
    orderBy('createdAt', 'desc')
  );

  repliesListener = onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.docChanges().length === 0) return;
    let reply = querySnapshot.docs.map((value) => {
      return { id: value.id, ...value.data() };
    });
    setReplies(reply);
  });
};

// Detaching replies listener to prevent memory leaks and unnecessary calls to the database
export const detachRepliesListener = (): void => {
  console.log('Detaching replies listener...');
  if (repliesListener != null) {
    repliesListener();
    repliesListener = null;
  }
};
