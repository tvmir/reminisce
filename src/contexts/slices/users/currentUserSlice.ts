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

export interface User {
  name: string;
  username: string;
  email: string;
  photoURL?: string;
  uid: string;
}

interface UserData {
  currentUser: User | DocumentData | undefined;
}

const initialState: UserData = {
  currentUser: {
    name: '',
    username: '',
    email: '',
    photoURL: '',
  },
};

// Handling signup and login functionalities
export const signup = (
  email: string,
  password: string,
  name: string,
  username: string,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>
  // bio?: string
) => {
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
        // bio,
      }).then(() => {
        navigation.navigate('Login');
      });

      // console.log(
      //   'Signing up with: \n',
      //   `Email: ${email}\n`,
      //   `Username: ${username}\n`
      // );
    })
    .catch((err) => {
      console.log(err.code, err.message);
    });
};

export const login = (email: string, password: string) => {
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

export const fetchUser = createAsyncThunk(
  'currentUser/fetchUser',
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

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const selectCurrentUser = (state: RootState) =>
  state.currentUser.currentUser;

export default currentUserSlice.reducer;
