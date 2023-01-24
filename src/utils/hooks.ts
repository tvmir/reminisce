import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { auth } from '../api/firebase';
import {
  fetchUsersByID,
  fetchFollowingUser,
  updateFollowCount,
} from '../contexts/services/user';
import { AppDispatch, RootState } from '../contexts/store';

// Pre-typed Dispatch and Selector hooks to be used throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const keys = {
  user: (uid: string) => ['users', uid],
  following: (uid: string, followedUID: string) => [
    'following',
    uid + followedUID,
  ],
};

// React Query hooks
export const useUserQuery = (uid: string, options = {}) => {
  return useQuery(keys.user(uid), () => fetchUsersByID(uid), options);
};

export const useFollowingQuery = (
  uid: any,
  followedUID: string,
  options = {}
) => {
  return useQuery(
    keys.following(uid, followedUID),
    () => fetchFollowingUser(uid, followedUID),
    options
  );
};

export const useFollowMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(updateFollowCount, {
    ...options,
    onMutate: (variables) => {
      queryClient.setQueryData(
        keys.following(auth.currentUser?.uid!, variables.followedUID),
        !variables.isFollowing
      );
    },
  });
};
