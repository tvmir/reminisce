import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { auth, db } from '../../api/firebase';
import { RootState } from '../store';

export interface User {
  name: string;
  username: string;
  email: string;
}

interface UserData {
  currentUser: User | DocumentData | undefined;
}

const initialState: UserData = {
  currentUser: {
    name: '',
    username: '',
    email: '',
  },
};

export const fetchUser = createAsyncThunk('currentUser/fetchUser', async () => {
  const userRef = doc(db, 'users', auth.currentUser?.uid!!);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    console.log('Unable to fetch user');
  }
});

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
