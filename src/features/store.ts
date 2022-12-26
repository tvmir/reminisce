import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './users/currentUserSlice';
import usersReducer from './users/usersSlice';
import scrapbooksReducer from './scrapbooks/scrapbooksSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    users: usersReducer,
    scrapbooks: scrapbooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
