import { DocumentData } from 'firebase/firestore';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { auth } from '../api/firebase';
import {
  fetchUsersByID,
  fetchFollowingUser,
  updateFollowCount,
  FollowCount,
} from '../contexts/services/user';
import { AppDispatch, RootState } from '../contexts/store';

// Pre-typed Dispatch and Selector hooks to be used throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// React Query hooks
export const keys = {
  user: (uid: string) => ['users', uid],
  following: (uid: string, followedUID: string) => [
    'following',
    uid + followedUID,
  ],
};

export const useUserQuery = (
  uid: string,
  options = {}
): UseQueryResult<DocumentData | undefined, unknown> => {
  return useQuery(keys.user(uid), () => fetchUsersByID(uid), options);
};

export const useFollowingQuery = (
  uid: string,
  followedUID: string,
  options = {}
): UseQueryResult<boolean, unknown> => {
  return useQuery(
    keys.following(uid, followedUID),
    () => fetchFollowingUser(uid, followedUID),
    options
  );
};

export const useFollowMutation = (
  options = {}
): UseMutationResult<void, unknown, FollowCount, void> => {
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
