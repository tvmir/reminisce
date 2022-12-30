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

export const fetchCurrentUserScrapbooks = createAsyncThunk(
  'currentUserScrapbooks/fetchCurrentUserScrapbooks',
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

const currentUserScrapbooksSlice = createSlice({
  name: 'currentUserScrapbooks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUserScrapbooks.fulfilled, (state, action) => {
      state.scrapbooks = action.payload;
    });
  },
});

export const selectCurrentUserScrapbooks = (state: RootState) =>
  state.currentUserScrapbooks.scrapbooks;

export default currentUserScrapbooksSlice.reducer;
