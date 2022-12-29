import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: -1,
  data: null,
  isOpen: false,
};

export const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    commentModal: (state, action) => {
      state.modalType = 0;
      state.data = action.payload;
      state.isOpen = true;
    },
    clear: (state) => {
      state.modalType = -1;
      state.data = null;
      state.isOpen = false;
    },
  },
});

export const { commentModal, clear } = modalsSlice.actions;

export default modalsSlice.reducer;
