import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../api/firebase';
import { RootState } from '../../store';
import { initialState } from './currentUserScrapbooksSlice';

export const fetchUserScrapbooks = createAsyncThunk(
  'userScrapbooks/fetchUserScrapbooks',
  async (uid: string | undefined) => {
    const scrapbooksRef = collection(db, 'scrapbooks');
    const q = query(
      scrapbooksRef,
      where('uid', '==', uid),
      orderBy('createdAt', 'desc')
    );

    const scrapbooksQuerySnapshot = await getDocs(q);
    let scrapbooks = scrapbooksQuerySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return scrapbooks;
  }
);

const userScrapbooksSlice = createSlice({
  name: 'userScrapbooks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserScrapbooks.fulfilled, (state, action) => {
      state.scrapbooks = action.payload;
    });
  },
});

export const selectCurrentUserScrapbooks = (state: RootState) =>
  state.userScrapbooks.scrapbooks;

export default userScrapbooksSlice.reducer;
