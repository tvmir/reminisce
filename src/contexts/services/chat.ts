import {
  addDoc,
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../api/firebase';

//
export const writeChat = async (members: string[]): Promise<void> => {
  const chatsRef = collection(db, 'chats');
  await addDoc(chatsRef, {
    members,
    recent_message: '',
    updatedAt: serverTimestamp(),
  });
};

//
export const writeMessage = async (
  cid: string,
  message: string
): Promise<void> => {
  const chatsRef = doc(db, 'chats', cid);
  const msgRef = collection(chatsRef, 'messages');
  await addDoc(msgRef, {
    uid: auth.currentUser?.uid,
    createdAt: serverTimestamp(),
    message,
  });
};

//
export const chatListener = (
  listener: (change: QuerySnapshot<DocumentData>) => void
): Unsubscribe => {
  const chatsRef = collection(db, 'chats');
  const q = query(
    chatsRef,
    where('members', 'array-contains', auth.currentUser?.uid!),
    orderBy('updatedAt', 'desc')
  );
  return onSnapshot(q, (change) => listener(change));
};

//
export const messageListener = (
  listener: (change: QuerySnapshot<DocumentData>) => void,
  cid: string
): Unsubscribe => {
  const chatsRef = doc(db, 'chats', cid);
  const q = query(
    collection(chatsRef, 'messages'),
    orderBy('createdAt', 'asc')
  );
  return onSnapshot(q, (change) => listener(change));
};
