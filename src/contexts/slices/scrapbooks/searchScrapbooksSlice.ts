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

interface ScrapbooksSearchData {
  scrapbooks: DocumentData[] | undefined;
}

const initialState: ScrapbooksSearchData = {
  scrapbooks: [],
};

// Fetches all scrapbooks that match the search query
export const fetchScrapbooksSearch = createAsyncThunk(
  'scrapbooks/fetchScrapbooksSearch',
  async (scrapbook: string) => {
    if (scrapbook === '') return [];
    const scrapbooksRef = collection(db, 'scrapbooks');
    const q = query(
      scrapbooksRef,
      where('name', '>=', scrapbook),
      where('name', '<=', scrapbook + '\uf8ff')
    );
    const scrapbooksQuerySnapshot = await getDocs(q);
    let scrapbooks = scrapbooksQuerySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return scrapbooks;
  }
);

// A slice for the search results
export const scrapbooksSearchSlice = createSlice({
  name: 'scrapbooks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchScrapbooksSearch.fulfilled, (state, action) => {
      state.scrapbooks = action.payload;
    });
  },
});

export const searchScrapbook = (state: RootState) =>
  state.scrapbooksSearch.scrapbooks;

export default scrapbooksSearchSlice.reducer;
