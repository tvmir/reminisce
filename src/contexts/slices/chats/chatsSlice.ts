import { createSlice } from '@reduxjs/toolkit';
import { DocumentData } from 'firebase/firestore';

interface ChatData {
  chats: DocumentData[] | undefined;
}

const initialState: ChatData = {
  chats: [],
};

// A slice for the chats data
export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    writeChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { writeChats } = chatsSlice.actions;

export default chatsSlice.reducer;
