import { auth, db } from '../../api/firebase';
import { updateProfilePicture } from '../../api/queries';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';

export const uploadProfilePicture = async (image: string) => {
  const path = `profile/${auth.currentUser?.uid}/${Math.random().toString(36)}`;
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
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Uploading... ' + Math.floor(progress) + '%');
    },
    (err) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateProfilePicture(downloadURL);
        console.log('File available at:', downloadURL);
      });
    }
  );
};

export const fetchUserFeedQuery = async (uid: string | undefined) => {
  const userRef = doc(db, 'users', uid!);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    console.log('Unable to fetch user');
  }
};
