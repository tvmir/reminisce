import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../../api/firebase';
import { RootState } from '../../store';

interface ScrapbookData {
  scrapbooks: DocumentData[] | undefined;
}

const initialState: ScrapbookData = {
  scrapbooks: [],
};

export const fetchUserScrapbooks = createAsyncThunk(
  'scrapbooks/fetchUserScrapbooks',
  async (uid: string | undefined = auth.currentUser?.uid) => {
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

// export const selectAllScrapbooks = (state: RootState) => state.scrapbooks.scrapbooks;

export default scrapbooksSlice.reducer;
