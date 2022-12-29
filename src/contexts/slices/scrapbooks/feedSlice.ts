import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { db } from '../../../api/firebase';
import { RootState } from '../../store';

interface ScrapbookData {
  feedScrapbooks: DocumentData[] | undefined;
}

const initialState: ScrapbookData = {
  feedScrapbooks: [],
};

export const fetchFeedScrapbooks = createAsyncThunk(
  'feedScrapbooks/fetchFeedScrapbooks',
  async () => {
    const scrapbooksRef = collection(db, 'scrapbooks');
    const scrapbooksSnapshot = await getDocs(scrapbooksRef);
    let scrapbooks = scrapbooksSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return scrapbooks;
  }
);

const feedScrapbooksSlice = createSlice({
  name: 'scrapbooks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeedScrapbooks.fulfilled, (state, action) => {
      state.feedScrapbooks = action.payload;
    });
  },
});

export const selectFeedScrapbooks = (state: RootState) =>
  state.feedScrapbooks.feedScrapbooks;

export default feedScrapbooksSlice.reducer;
