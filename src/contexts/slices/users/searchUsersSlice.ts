import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../api/firebase';
import { RootState } from '../../store';

interface UsersSearchData {
  users: DocumentData[] | undefined;
}

const initialState: UsersSearchData = {
  users: [],
};

// Used for search functionality
export const fetchUsersSearch = createAsyncThunk(
  'users/fetchUsersSearch',
  async () => {
    // if (user === '') return [];
    // const usersRef = collection(db, 'users');
    // const q = query(
    //   usersRef,
    //   where('username', '>=', user),
    //   where('username', '<=', user + '\uf8ff')
    // );
    // const usersQuerySnapshot = await getDocs(q);
    // let users = usersQuerySnapshot.docs.map((doc) => {
    //   return { id: doc.id, ...doc.data() };
    // });
    // return users;

    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const usersSnapshot = await getDocs(q);
    let users = usersSnapshot.docs.map((doc) => {
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
    builder.addCase(fetchUsersSearch.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.users.users;

export default usersSlice.reducer;
