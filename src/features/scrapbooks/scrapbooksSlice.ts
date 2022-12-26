import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { auth, db } from '../../api/firebase';
import { RootState } from '../store';

interface ScrapbookData {
  scrapbooks: DocumentData[] | undefined;
}

const initialState: ScrapbookData = {
  scrapbooks: [],
};

export const fetchUserScrapbooks = createAsyncThunk(
  'scrapbooks/fetchUserScrapbooks',
  async () => {
    const scrapbooksRef = doc(db, 'scrapbooks', auth.currentUser?.uid!!);
    const q = query(
      collection(scrapbooksRef, 'user_scrapbooks'),
      orderBy('createdAt', 'desc')
    );

    const scrapbooksQuerySnapshot = await getDocs(q);
    let scrapbooks = scrapbooksQuerySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return scrapbooks;
  }
);

const scrapbooksSlice = createSlice({
  name: 'scrapbooks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserScrapbooks.fulfilled, (state, action) => {
      state.scrapbooks = action.payload;
    });
  },
});

export const selectScrapbooks = (state: RootState) =>
  state.scrapbooks.scrapbooks;

export default scrapbooksSlice.reducer;
