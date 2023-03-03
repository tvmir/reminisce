import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './slices/users/currentUserSlice';
import userReducer from './slices/users/userSlice';
import usersReducer from './slices/users/usersSlice';
import usersSearchReducer from './slices/users/searchUsersSlice';
import currentUserScrapbooksReducer from './slices/scrapbooks/currentUserScrapbooksSlice';
import userScrapbooksReducer from './slices/scrapbooks/userScrapbooksSlice';
import scrapbooksReducer from './slices/scrapbooks/scrapbooksSlice';
import modalsReducer from './slices/modals/modalsSlice';
import scrapbooksSearchReducer from './slices/scrapbooks/searchScrapbooksSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    user: userReducer,
    users: usersReducer,
    usersSearch: usersSearchReducer,
    currentUserScrapbooks: currentUserScrapbooksReducer,
    userScrapbooks: userScrapbooksReducer,
    scrapbooks: scrapbooksReducer,
    scrapbooksSearch: scrapbooksSearchReducer,
    modal: modalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
