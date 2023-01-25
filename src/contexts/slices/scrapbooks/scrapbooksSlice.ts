import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../../api/firebase';
import { fetchFollowingUsers } from '../../services/user';
import { RootState } from '../../store';

interface ScrapbookData {
  scrapbooks: DocumentData[] | undefined;
}

const initialState: ScrapbookData = {
  scrapbooks: [],
};

// This is currently showcasing the most recent scrapbooks in our feed, we can customize it later on
export const fetchScrapbooks = createAsyncThunk(
  'scrapbooks/fetchScrapbooks',
  async () => {
    const scrapbooksRef = collection(db, 'scrapbooks');
    const q = query(scrapbooksRef, orderBy('createdAt', 'desc'));
    const scrapbooksSnapshot = await getDocs(q);
    let scrapbooks = scrapbooksSnapshot.docs.map((doc) => {
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
    builder.addCase(fetchScrapbooks.fulfilled, (state, action) => {
      state.scrapbooks = action.payload;
    });
  },
});

export const selectFeedScrapbooks = (state: RootState) =>
  state.scrapbooks.scrapbooks;

export default scrapbooksSlice.reducer;
