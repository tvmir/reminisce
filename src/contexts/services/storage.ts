import {
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage';

// This function is used to upload images to Firebase Storage
export const uploadImage = async (
  image: string,
  path: string
): Promise<UploadTaskSnapshot> => {
  const storage = getStorage();
  const response = await fetch(image);
  const storageRef = ref(storage, path);
  const blob = await response.blob();
  const metadata = { contentType: 'image/jpeg' };

  const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
  return uploadTask;
};
