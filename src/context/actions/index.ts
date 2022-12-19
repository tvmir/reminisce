import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../api/firebase';
import { FETCH_USER } from '../constants';
import { AppDispatch } from '../store';

export function fetchUser() {
  return async (dispatch: AppDispatch) => {
    const userRef = doc(db, 'users', auth.currentUser?.uid!!);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      dispatch({
        type: FETCH_USER,
        currentUser: userSnap.data(),
      });
    } else {
      console.log('Unable to fetch user');
    }
  };
}
