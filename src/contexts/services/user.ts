import { auth, db } from '../../api/firebase';
import { getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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
  const scrapbookUserRef = doc(db, 'users', auth.currentUser?.uid!!);
  await updateDoc(scrapbookUserRef, {
    photoURL,
  })
    .then(() => {
      console.log('Profile picture has been updated successfully');
      // navigation.pop();
    })
    .catch((err) => {
      console.log('Error updating profile picture: ', err);
    });
};

// Fetching users from the database (for the feed screen)
export const fetchUsers = async (uid: string) => {
  const userRef = doc(db, 'users', uid!);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    console.log('Unable to fetch user');
  }
};
