import { combineReducers } from 'redux';
import { userReducer } from './user';

export const Reducers = combineReducers({
  userState: userReducer,
});
