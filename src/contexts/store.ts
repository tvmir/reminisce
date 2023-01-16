import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './slices/users/currentUserSlice';
import userReducer from './slices/users/userSlice';
import usersSearchReducer from './slices/users/searchUsersSlice';
import currentUserScrapbooksReducer from './slices/scrapbooks/currentUserScrapbooksSlice';
import userScrapbooksReducer from './slices/scrapbooks/userScrapbooksSlice';
import scrapbooksReducer from './slices/scrapbooks/scrapbooksSlice';
import modalsReducer from './slices/modals/modalsSlice';
import scrapbooksSearchReducer from './slices/scrapbooks/searchScrapbooksSlice';
import locationsReducer from './slices/locations/locationsSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    user: userReducer,
    users: usersSearchReducer,
    currentUserScrapbooks: currentUserScrapbooksReducer,
    userScrapbooks: userScrapbooksReducer,
    scrapbooks: scrapbooksReducer,
    scrapbooksSearch: scrapbooksSearchReducer,
    modal: modalsReducer,
    locations: locationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
