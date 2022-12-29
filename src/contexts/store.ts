import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './slices/users/currentUserSlice';
import usersReducer from './slices/users/usersSlice';
import scrapbooksReducer from './slices/scrapbooks/scrapbooksSlice';
import feedScrapbooksReducer from './slices/scrapbooks/feedSlice';
import modalsReducer from './slices/modals/modalsSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    users: usersReducer,
    scrapbooks: scrapbooksReducer,
    feedScrapbooks: feedScrapbooksReducer,
    modal: modalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
