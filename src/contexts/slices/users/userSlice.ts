import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { db } from '../../../api/firebase';
import { RootState } from '../../store';

interface UserData {
  user: User | DocumentData | undefined;
}

const initialState: UserData = {
  user: {
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

// Fetching user data by their uid
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (uid: string | undefined) => {
    const userRef = doc(db, 'users', uid!);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log('Unable to fetch user');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
