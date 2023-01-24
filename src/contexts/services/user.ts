import { auth, db } from '../../api/firebase';
import { getDownloadURL } from 'firebase/storage';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { uploadImage } from './storage';

// Uploading a user's profile picture to Firebase Storage
export const uploadProfilePicture = async (image: string) => {
  const path = `profile_pictures/${
    auth.currentUser?.uid
  }/${Math.random().toString(36)}`;

  const uploadTask = (await uploadImage(image, path)).task;

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Uploading... ' + Math.floor(progress) + '%');
    },
    (err) => {
      console.log('ERROR', err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateProfilePicture(downloadURL);
      });
    }
  );
};

// Updating a user's profile picture
export const updateProfilePicture = async (photoURL: string) => {
  const scrapbookUserRef = doc(db, 'users', auth.currentUser?.uid!);
  await updateDoc(scrapbookUserRef, {
    photoURL,
  })
    .then(() => {
      console.log('Profile picture has been updated successfully');
    })
    .catch((err) => {
      console.log('Error updating profile picture: ', err);
    });
};

// Updating user details (found in the edit profile screen)
export const updateUserDetails = async (field: any, text: string) => {
  let docField: any = {};
  docField[field] = text;

  const scrapbookUserRef = doc(db, 'users', auth.currentUser?.uid!);
  await updateDoc(scrapbookUserRef, docField)
    .then(() => {
      console.log('User details have been updated successfully');
    })
    .catch((err) => {
      console.log('Error updating user details: ', err);
    });
};

// Fetching users by their UID (for the feed screen)
export const fetchUsersByID = async (uid: string) => {
  const userRef = doc(db, 'users', uid!);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    console.log('Unable to fetch user');
  }
};

// Fetching followed user by their UID
export const fetchFollowingUser = async (uid: string, followedUID: string) => {
  const userRef = doc(db, 'users', uid!);
  const followedUserRef = doc(userRef, 'following', followedUID!);
  const followingDoc = await getDoc(followedUserRef);

  return followingDoc.exists();
};

// Fetching all followed users (for the feed screen)
export const fetchFollowingUsers = async (uid: string) => {
  const userRef = doc(db, 'users', uid!);
  const followingCollection = await getDocs(collection(userRef, 'following'));
  const followingUsers = followingCollection.docs.map((doc) => doc.id);

  return followingUsers;
};

// export const fetch

// Updating the followers and following simultaneously (by adding or removing it from their respective subcollections)
export const updateFollow = async ({ followedUID, isFollowing }: any) => {
  // following
  const followingUserRef = doc(db, 'users', auth.currentUser?.uid!);
  const followingRef = doc(followingUserRef, 'following', followedUID!);

  // followers
  const followerUserRef = doc(db, 'users', followedUID!);
  const followersRef = doc(
    followerUserRef,
    'followers',
    auth.currentUser?.uid!
  );

  if (isFollowing) {
    await deleteDoc(followingRef);
    await deleteDoc(followersRef);
  } else {
    await setDoc(followingRef, {});
    await setDoc(followersRef, {});
  }
};

// Updating the followers and following count, handled by a transaction and cached via a useMutation hook
export const updateFollowCount = async ({ followedUID, isFollowing }: any) => {
  const followingRef = doc(db, 'users', auth.currentUser?.uid!);
  const followersRef = doc(db, 'users', followedUID!);

  if (isFollowing) {
    await runTransaction(db, async (transaction) => {
      // following
      const followingDoc = await transaction.get(followingRef);
      const numOfFollowing = followingDoc.get('following_count');
      // followers
      const followersDoc = await transaction.get(followersRef);
      const numOfFollowers = followingDoc.get('followers_count');

      if (numOfFollowing > 0 || numOfFollowers > 0) {
        const followingCount = followingDoc?.data()?.following_count - 1;
        const followersCount = followersDoc?.data()?.followers_count - 1;

        transaction.update(followingRef, { following_count: followingCount });
        transaction.update(followersRef, { followers_count: followersCount });
      }
    });
  } else {
    await runTransaction(db, async (transaction) => {
      const followingDoc = await transaction.get(followingRef);
      const followersDoc = await transaction.get(followersRef);

      const followingCount = followingDoc?.data()?.following_count + 1;
      const followersCount = followersDoc?.data()?.followers_count + 1;

      transaction.update(followingRef, { following_count: followingCount });
      transaction.update(followersRef, { followers_count: followersCount });
    });
  }
  updateFollow({ followedUID, isFollowing });
};
