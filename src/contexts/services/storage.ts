import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

// This function is used to upload images to Firebase Storage
export const uploadImage = async (image: string, path: string) => {
  const storage = getStorage();
  const response = await fetch(image);
  const storageRef = ref(storage, path);
  const blob = await response.blob();
  const metadata = { contentType: 'image/jpeg' };
  console.log('Storage PATH:', path);

  const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
  return uploadTask;
};
