import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './slices/users/currentUserSlice';
import usersSearchReducer from './slices/users/usersSlice';
import currentUserScrapbooksReducer from './slices/scrapbooks/currentUserScrapbooksSlice';
import scrapbooksReducer from './slices/scrapbooks/scrapbooksSlice';
import modalsReducer from './slices/modals/modalsSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    users: usersSearchReducer,
    currentUserScrapbooks: currentUserScrapbooksReducer,
    scrapbooks: scrapbooksReducer,
    modal: modalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
