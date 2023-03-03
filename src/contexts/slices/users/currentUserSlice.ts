import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, DocumentData, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../api/firebase';
import { RootStackParamList } from '../../../utils/types';
import { RootState } from '../../store';

export interface CurrentUser {
  name: string;
  username: string;
  email: string;
  photoURL?: string;
  createdAt?: string;
  uid: string;
  bio: string;
  followers_count: number;
  following_count: number;
}

interface CurrentUserData {
  currentUser: CurrentUser | DocumentData | undefined;
}

const initialState: CurrentUserData = {
  currentUser: {
    name: '',
    username: '',
    email: '',
    photoURL: '',
    createdAt: '',
    bio: '',
    followers_count: 0,
    following_count: 0,
  },
};

// Sign up a new user
export const signup = (
  email: string,
  password: string,
  name: string,
  username: string,
  bio: string,
  location: string,
  followers_count: number,
  following_count: number
): void => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: username,
      });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        photoURL: user.photoURL,
        username: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        createdAt: user.metadata.creationTime,
        bio,
        location,
        followers_count,
        following_count,
      }).then(() => {
        console.log('User created');
      });
    })
    .catch((err) => {
      console.log(err.code, err.message);
    });
};

// Log in an existing user
export const login = (email: string, password: string): void => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(
        'Logging in with: \n',
        `Email: ${user.email}\n`,
        `Username: ${user.displayName}\n`
      );
    })
    .catch((err) => {
      console.log(err.code, err.message);
    });
};

// Fetch the current user on app load
export const fetchCurrentUser = createAsyncThunk(
  'currentUser/fetchCurrentUser',
  async (uid: string | undefined = auth.currentUser?.uid) => {
    const userRef = doc(db, 'users', uid!);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log('Unable to fetch user');
    }
  }
);

// A slice for the current user
export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const selectCurrentUser = (state: RootState) =>
  state.currentUser.currentUser;

export default currentUserSlice.reducer;
