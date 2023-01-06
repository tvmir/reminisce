import { useQuery } from 'react-query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { fetchUsersByID } from '../contexts/services/user';
import { AppDispatch, RootState } from '../contexts/store';

// Pre-typed Dispatch and Selector hooks to be used throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// React Query hooks
export const useUserQuery = (uid: string, options = {}) => {
  return useQuery(['users', uid], () => fetchUsersByID(uid), options);
};
