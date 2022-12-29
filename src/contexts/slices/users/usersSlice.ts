import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../api/firebase';
import { RootState } from '../../store';

interface UsersData {
  users: DocumentData[] | undefined;
}

const initialState: UsersData = {
  users: [],
};

// Used for search
// TODO: update function name
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (user: string) => {
    if (user === '') return [];
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('username', '>=', user),
      where('username', '<=', user + '\uf8ff')
    );
    const usersQuerySnapshot = await getDocs(q);
    let users = usersQuerySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return users;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.users.users;

export default usersSlice.reducer;
