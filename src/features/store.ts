import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './users/currentUserSlice';
import scrapbooksReducer from './scrapbooks/scrapbooksSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    scrapbooks: scrapbooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
