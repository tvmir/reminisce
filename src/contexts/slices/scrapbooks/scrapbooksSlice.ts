import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { db } from '../../../api/firebase';
import { RootState } from '../../store';

interface ScrapbookData {
  scrapbooks: DocumentData[] | undefined;
}

const initialState: ScrapbookData = {
  scrapbooks: [],
};

export const fetchScrapbooks = createAsyncThunk(
  'scrapbooks/fetchScrapbooks',
  async () => {
    const scrapbooksRef = collection(db, 'scrapbooks');
    const scrapbooksSnapshot = await getDocs(scrapbooksRef);
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
